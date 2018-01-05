import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../../../providers/database/services/pedido';
import { Pedido, PedidoHistorico, DicionarioStatusPedido, StatusPedido } from '../../../../providers/database/models/pedido';
import * as moment from 'moment';
import * as firebase from 'firebase';

import 'moment/locale/pt-br';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Usuario } from '../../../../providers/database/models/usuario';
import { UsuarioService } from '../../../../providers/database/services/usuario';
import { PerfilAcessoService } from '../../../../providers/database/services/perfil-acesso';
import { DistribuidorService } from '../../../../providers/database/services/distribuidor';
import { Distribuidor } from '../../../../providers/database/models/distribuidor';
import { PerfilAcesso } from '../../../../providers/database/models/perfil-acesso';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
@IonicPage()
@Component({
  selector: 'page-pedidos-ditstribuidor-evoluir',
  templateUrl: 'pedidos-ditstribuidor-evoluir.html',
})
export class PedidosDitstribuidorEvoluirPage {
  pedido: Pedido;
  timeLineItens = [];
  dicionarioStatusPedido = DicionarioStatusPedido
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoSrvc: PedidoService,
    public alertCtrl: AlertController,
    public usuarioSrvc: UsuarioService,
    public perfilService: PerfilAcessoService,
    public distribuidorSrvc: DistribuidorService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    if (this.navParams.data) {
      this.pedidoSrvc.get((<Pedido>this.navParams.data).$key).subscribe((pedido: Pedido) => {
        this.pedido = pedido;
        this.timeLineItens = [];
        this.pedido.historico.map((pedidoHistorico: PedidoHistorico) => {
          let dataHistorico = moment(pedidoHistorico.data);
          let dataAtual = moment().format('DDMMYYYY')
          let itemHistorico = {
            title: '',
            content: `${pedido.status == pedidoHistorico.status ? DicionarioStatusPedido[pedidoHistorico.status].MensagemDistribuidor : ''} ${pedidoHistorico.observacao ? `(Observação: "${pedidoHistorico.observacao}")`:``}`,
            icon: DicionarioStatusPedido[pedidoHistorico.status].icon,
            time: {
              title: DicionarioStatusPedido[pedidoHistorico.status].status,
              subtitle: dataAtual == dataHistorico.format('DDMMYYYY') ? `Hoje às ${dataHistorico.format('HH:mm')}` : `Em ${dataHistorico.format('DD/MM/YYYY')} às ${dataHistorico.format('HH:mm')}`
            }
          }
          this.timeLineItens.push(itemHistorico)
        })
      })
    }
  }

  detalhesPedido() {
    this.navCtrl.push('DetalhesPedidoDistribuidorPage', this.pedido)
  }

  confirmarPedido() {
    let alert = this.alertCtrl.create({
      title: 'Confirmação do Pedido',
      message: `Certifique-se que todos os produtos se encontram em estoque para evitar erros no atendimento.`,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            return true;
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.evoluirPedido(1);
          }
        }
      ]
    });
    alert.present();
  }

  concoluirMontagemPedido() {
    let alert = this.alertCtrl.create({
      title: 'Concluir Montagem',
      message: `Deseja finalizar montagem do Pedido.`,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            return true;
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.evoluirPedido(2);
          }
        }
      ]
    });
    alert.present();
  }

  selecionarEntregador(perfil) {

    let usuariosLista: Usuario[] = [];
    this.perfilService.getByMnemonico('DIST_ENTR').then((perfil: PerfilAcesso) => {
      let keyPerfil = (<any>Object).keys(perfil)[0];
      this.distribuidorSrvc.get(this.pedido.distribuidor.key).take(1).subscribe((distribuidor: Distribuidor) => {
        if ((<any>Object).keys(distribuidor.dist_perfis).filter(key => key == keyPerfil).length > 0) {
          (<any>Object).keys(distribuidor.dist_perfis).filter(key => key == keyPerfil).forEach(distKeyPerfil => {
            this.usuarioSrvc.usuarios.take(1).subscribe((usuarios: Usuario[]) => {
              usuariosLista = usuarios.filter(
                usuario => (<any>Object).entries(usuario.usr_perfis).filter(([key, value]) => key == distKeyPerfil && value.per_distribuidora == true && value.per_keyDistribuidora == this.pedido.distribuidor.key
                ).length > 0)
              console.log(usuariosLista);
              if (usuariosLista.length == 0) {
                let toast = this.toastCtrl.create({
                  message: `Distribuidor "${this.pedido.distribuidor.dist_nome}" não possui entregadores cadastrados.`,
                  duration: 3000,
                  position: 'top'
                });
                toast.present()
              } else {
                this.definirEntregador(usuariosLista);
              }
            })
          })
        } else {
          let toast = this.toastCtrl.create({
            message: `Distribuidor "${this.pedido.distribuidor.dist_nome}" não possui perfis de entregadores.`,
            duration: 3000,
            position: 'top'
          });
          toast.present()
        }
      })
    })
  }

  definirEntregador(usuarios: Usuario[]) {
    let modal = this.modalCtrl.create('SelectUsuarioPage', { usuarios: usuarios });
    modal.present();
    modal.onDidDismiss(data => {
      if (data)
        if (data.usuariosSelecionados) {
          data.usuariosSelecionados.forEach((usuario: Usuario) => {

            let alert = this.alertCtrl.create({
              title: 'Confirmar da entrega',
              message: `Deseja atribuir a entrega deste pedido ao entregador "${usuario.usr_nome}".`,
              buttons: [
                {
                  text: 'Cancelar',
                  handler: data => {
                    return true;
                  }
                },
                {
                  text: 'Confirmar',
                  handler: data => {
                    this.atribuirEntregadorPedido(usuario)
                    this.evoluirPedido(3);
                  }
                }
              ]
            });
            alert.present();
          });
        }
    })

  }

  atribuirEntregadorPedido(usuario: Usuario) {
    let entregador = new Usuario();
    if (usuario.key) entregador.key =  usuario.key;
    if (usuario.usr_fb_id) entregador.usr_fb_id =  usuario.usr_fb_id;
    if (usuario.usr_fb_foto) entregador.usr_fb_foto =  usuario.usr_fb_foto;
    if (usuario.usr_nome) entregador.usr_nome = usuario.usr_nome;
    if (usuario.usr_email) entregador.usr_email =  usuario.usr_email;
    if (usuario.usr_foto) entregador.usr_foto =  usuario.usr_foto;
    
    this.pedido.entregador =  entregador;
    return this.pedidoSrvc.update(this.pedido.$key, this.pedido);    
  }

  evoluirPedido(status: number) {
    let currentDate = firebase.database.ServerValue.TIMESTAMP;
    this.pedido.status = status;
    this.pedido.historico.push(<PedidoHistorico>{
      status: status,
      data: currentDate
    })
    return this.pedidoSrvc.update(this.pedido.$key, this.pedido);
  }
}

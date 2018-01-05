import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../../../../providers/database/models/usuario';
import { PerfilAcessoService } from '../../../../../providers/database/services/perfil-acesso';
import { DistribuidorService } from '../../../../../providers/database/services/distribuidor';
import { UsuarioService } from '../../../../../providers/database/services/usuario';
import { PerfilAcesso } from '../../../../../providers/database/models/perfil-acesso';
import { Distribuidor } from '../../../../../providers/database/models/distribuidor';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PedidoService } from '../../../../../providers/database/services/pedido';
import { PedidoHistorico, DicionarioStatusPedido } from '../../../../../providers/database/models/pedido';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-detalhes-pedido-distribuidor',
  templateUrl: 'detalhes-pedido-distribuidor.html',
})
export class DetalhesPedidoDistribuidorPage {
  pedido
  dicionarioStatusPedido = DicionarioStatusPedido;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public perfilService: PerfilAcessoService,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public pedidoSrvc:PedidoService
  ) {
    if (this.navParams.data) {
      this.pedido = this.navParams.data;
    }
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
    if (usuario.key) entregador.key = usuario.key;
    if (usuario.usr_fb_id) entregador.usr_fb_id = usuario.usr_fb_id;
    if (usuario.usr_fb_foto) entregador.usr_fb_foto = usuario.usr_fb_foto;
    if (usuario.usr_nome) entregador.usr_nome = usuario.usr_nome;
    if (usuario.usr_email) entregador.usr_email = usuario.usr_email;
    if (usuario.usr_foto) entregador.usr_foto = usuario.usr_foto;

    this.pedido.entregador = entregador;
    return this.pedidoSrvc.update(this.pedido.$key, this.pedido);
  }

  cancelarPedido() {
    let alert = this.alertCtrl.create({
      title: 'Cancelar?',
      message: `Deseja cancelar o pedido?
                Informe o motivo do cancelamento.`,
      inputs: [
        {
          name: 'observacao',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: data => {
            if (data.observacao) {
              this.cancelarPedidoBase(data.observacao);
            } else {
              let toast = this.toastCtrl.create({
                message: "Informe o motivo para cancelamento do pedido.",
                duration: 3000,
                position: 'top'
              });
              toast.present()
                        
              return false;
            }
          }
        }
      ]
    });
    alert.present();
    
  }
  cancelarPedidoBase(observacao: string) {
    let currentDate = firebase.database.ServerValue.TIMESTAMP;
    this.pedido.status = 6;
    this.pedido.historico.push(<PedidoHistorico>{
      status: 6,
      data: currentDate,
      observacao: observacao
    })
    this.navCtrl.pop();
    return this.pedidoSrvc.update(this.pedido.$key, this.pedido);    
  }

}

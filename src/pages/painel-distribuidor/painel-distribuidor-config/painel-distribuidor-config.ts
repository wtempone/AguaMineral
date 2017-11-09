import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { PerfilAcesso } from './../../../providers/database/models/perfil-acesso';
import { Usuario } from './../../../providers/database/models/usuario';
import { PerfilAcessoService } from './../../../providers/database/services/perfil-acesso';
import { UsuarioService } from './../../../providers/database/services/usuario';
import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { PerfilUsuario } from '../../../providers/database/models/perfil-usuario';

@IonicPage()
@Component({
  selector: 'page-painel-distribuidor-config',
  templateUrl: 'painel-distribuidor-config.html',
})
export class PainelDistribuidorConfigPage {
  distribuidor: Distribuidor;
  perfisDistribuidor: any[];
  funcionarios: Usuario[];
  configuracao = "geral";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    public perfilAcessoSrvc: PerfilAcessoService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public distribuidorSrvc: DistribuidorService
  ) {
    if (navParams.data.key) {
      this.mudarDistribuidor(this.navParams.data.key);
    }
  }
  public mudarDistribuidor(key: string) {
    if (key) {
      this.distribuidorSrvc.get(key).take(1).subscribe((distribuidor: Distribuidor)=>{
        this.distribuidor = distribuidor;
        this.refresh();
      })
    }
  }
  alterarDados(distribuidor) {
    this.navCtrl.push('DistribuidorEditPage', { distribuidor: distribuidor });
  }
  ativar() {
    this.distribuidor.dist_ativo = !this.distribuidor.dist_ativo;
    this.distribuidorSrvc.update(this.distribuidor.$key, this.distribuidor)
  }
  refresh() {
    this.perfisDistribuidor = [];
    this.funcionarios = [];
    (<any>Object).keys(this.distribuidor.dist_funcionarios).map(keyUsuario => {
      this.usuarioSrvc.get(keyUsuario).take(1).subscribe((usuario: Usuario) => {
        this.funcionarios.push(usuario);
      })
    })

    this.usuarioSrvc.usuarios.take(1).subscribe((usuarios: Usuario[]) => {
      (<any>Object).keys(this.distribuidor.dist_perfis).map(keyPerfil => {
        this.perfilAcessoSrvc.getByKey(keyPerfil).take(1).subscribe((perfil: PerfilAcesso) => {
          let perfisDistribuidor: any = perfil;
          perfisDistribuidor.per_usuarios = usuarios.filter(x => (<any>Object).entries(x.usr_perfis).filter(([key, value]) => key == perfil.$key && (value.per_distribuidora == true && value.per_keyDistribuidora == this.distribuidor.$key)).length > 0)
          this.perfisDistribuidor.push(perfisDistribuidor);
        })
      })
    })

  }

  excluiPerfil(perfil, usuario) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o usuário do grupo?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.usuarioSrvc.excluirPerfil(usuario.$key, perfil.$key).then(() => {
              this.refresh();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  selecionarUsuario(perfil) {
    let usuariosLista: Usuario[] = [];
    usuariosLista = this.funcionarios.filter(x => (<any>Object).entries(x.usr_perfis).filter(([key, value]) => key == perfil.$key && (value.per_distribuidora == true && value.per_keyDistribuidora == this.distribuidor.$key)).length == 0)
    if (usuariosLista.length == 0) {
      let toast = this.toastCtrl.create({
        message: 'Não há funcionarios para adicionar.',
        duration: 3000,
        position: 'top'
      });
      toast.present()
    } else {
      let modal = this.modalCtrl.create('SelectUsuarioPage', { usuarios: usuariosLista });
      modal.present();
      modal.onDidDismiss(data => {
        if (data)
          if (data.usuariosSelecionados) {
            let valorPerfil: PerfilUsuario = {
              per_distribuidora: true,
              per_keyDistribuidora: this.distribuidor.$key
            }
            data.usuariosSelecionados.forEach((usuario: Usuario) => {
              this.usuarioSrvc.addPerfil(usuario.$key, perfil.$key, valorPerfil).then(() => {
                this.refresh();
              })
            });
          }
      })
    }
  }

}

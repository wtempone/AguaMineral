import { PerfilAcessoService } from './../../../../providers/database/services/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { UsuarioService } from '../../../../providers/database/services/usuario';
import { PerfilAcesso } from '../../../../providers/database/models/perfil-acesso';
import { Usuario } from '../../../../providers/database/models/usuario';

@IonicPage()
@Component({
  selector: 'page-grupo-usuario',
  templateUrl: 'grupo-usuario.html',
})
export class GrupoUsuarioPage {
  perfisUsuarios: any[] = [];
  perfis: PerfilAcesso[]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public perfilAcessoSrvc: PerfilAcessoService,
    public usuarioSrvc: UsuarioService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    this.refresh();
  }

  adirionarUsuario(perfil) {
  }

  refresh() {
    this.perfisUsuarios = [];
    this.usuarioSrvc.usuarios.take(1).subscribe((usuarios: Usuario[]) => {
      this.perfilAcessoSrvc.perfisAcesso.take(1).subscribe(perfis => perfis
        .map(perfil => {
          let perfilUsuario: any = perfil;
          perfilUsuario.per_usuarios = usuarios.filter(x => (<any>Object).keys(x.usr_perfis).filter(key => key == perfil.$key).length > 0);
          this.perfisUsuarios.push(perfilUsuario);
        })
      )
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
    this.usuarioSrvc.usuarios.take(1).subscribe((usuarios: Usuario[]) => {
      usuariosLista = usuarios.filter(x => (<any>Object).keys(x.usr_perfis).filter(key => key == perfil.$key).length == 0);
      if (usuariosLista.length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Todas as usuarios foram adicionadas.',
          duration: 3000,
          position: 'top'
        });
        toast.present()
      } else {
        let modal = this.modalCtrl.create('SelectUsuarioPage', { usuarios: usuarios });
        modal.present();
        modal.onDidDismiss(data => {
          if (data)
            if (data.usuariosSelecionados) {
              data.usuariosSelecionados.forEach((usuario: Usuario) => {
                this.usuarioSrvc.adicionarPerfil(usuario.$key, perfil.$key).then(()=>{
                  this.refresh();
                })
              });
            }
        })
      }
    })
  }
}

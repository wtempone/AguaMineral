import { MenuAcesso } from './../../../../../providers/database/models/menu-acesso';
import { Funcionalidade } from './../../../../../providers/database/models/funcionalidade';
import { PerfilAcesso } from './../../../../../providers/database/models/perfil-acesso';
import { FuncionalidadeService } from './../../../../../providers/database/services/funcionalidade';
import { PerfilAcessoService } from './../../../../../providers/database/services/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { MenuService } from '../../../../../providers/database/services/menu';
import { UsuarioService } from '../../../../../providers/database/services/usuario';

@IonicPage()
@Component({
  selector: 'page-perfil-list',
  templateUrl: 'perfil-list.html',
})
export class PerfilListPage {
  mnemonico = "PerfilListPage"
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public perfilSrvc: PerfilAcessoService,
    public funcionalidadeSrvc: FuncionalidadeService,
    public menuSrvc: MenuService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public usuarioSrvc: UsuarioService
  ) {
  }

  editPerfil(perfil?: PerfilAcesso) {
    let modal = this.modalCtrl.create('PerfilEditPage', { perfil: perfil });
    modal.present({
      ev: event
    });
  }

  configurarPerfil(perfil){
    this.navCtrl.push('PerfilConfigPage',{ perfil: perfil});
  }

  excluirPerfil(key) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.perfilSrvc.delete(key).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  editFuncionalidade(funcionalidade?: Funcionalidade) {
    let modal = this.modalCtrl.create('FuncionalidadeEditPage', { funcionalidade: funcionalidade });
    modal.present({
      ev: event
    });
  }

  configurarFuncionalidade(funcionalidade){
    this.navCtrl.push('FuncionalidadeConfigPage',{ funcionalidade: funcionalidade});
  }

  excluirFuncionalidade(key) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.funcionalidadeSrvc.delete(key).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }
  

  editMenu(menu?: MenuAcesso) {
    let modal = this.modalCtrl.create('MenuEditPage', { menu: menu });
    modal.present({
      ev: event
    });
  }

  excluirMenu(key) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.menuSrvc.delete(key).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }
    
}

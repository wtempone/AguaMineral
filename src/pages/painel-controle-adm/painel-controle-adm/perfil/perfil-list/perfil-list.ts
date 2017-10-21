import { PerfilAcesso } from './../../../../../providers/database/models/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PerfilAcessoService } from '../../../../../providers/database/services/perfil-acesso';

/**
 * Generated class for the PerfilListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-list',
  templateUrl: 'perfil-list.html',
})
export class PerfilListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public perfilAcessoSrvc: PerfilAcessoService,
    public perfilSrvc: PerfilAcessoService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  editPerfil(perfil?: PerfilAcesso) {
    let modal = this.modalCtrl.create('PerfilEditPage', { perfil: perfil });
    modal.present({
      ev: event
    });
  }

  configurarPerfil(perfil){
    this.navCtrl.push('FuncionalidadeListPage',{ perfil: perfil});
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
            this.perfilAcessoSrvc.delete(key).then(() => {
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

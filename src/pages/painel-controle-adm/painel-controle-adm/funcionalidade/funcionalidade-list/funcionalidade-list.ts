import { Funcionalidade } from './../../../../../providers/database/models/funcionalidade';
import { FuncionalidadeService } from './../../../../../providers/database/services/funcionalidade';
import { PerfilAcesso } from './../../../../../providers/database/models/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-funcionalidade-list',
  templateUrl: 'funcionalidade-list.html',
})
export class FuncionalidadeListPage {
  perfil: PerfilAcesso;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public funcionalidadeSrvc: FuncionalidadeService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    
  ) {
    if (this.perfil = navParams.data.perfil)
      this.perfil = navParams.data.perfil;
      this.funcionalidadeSrvc.get(this.perfil.$key)
  }

  editPerfil(funcionalidade?: PerfilAcesso) {
    let modal = this.modalCtrl.create('FuncionalidadeEditPage', { funcionalidade: funcionalidade });
    modal.present({
      ev: event
    });
  }

  configurarPerfil(funcionalidade){
    this.navCtrl.push('AcaoListPage',{ funcionalidade: funcionalidade});
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
}

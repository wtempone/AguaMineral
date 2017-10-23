import { Acao } from './../../../../../../providers/database/models/acao';
import { AcaoService } from './../../../../../../providers/database/services/acao';
import { Funcionalidade } from './../../../../../../providers/database/models/funcionalidade';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-funcionalidade-config',
  templateUrl: 'funcionalidade-config.html',
})
export class FuncionalidadeConfigPage {
  funcionalidade: Funcionalidade;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public acaoSrvc: AcaoService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    if (this.navParams.data.funcionalidade) {
      this.funcionalidade = this.navParams.data.funcionalidade;    
      this.acaoSrvc.getAll(this.funcionalidade.$key);
    } else {
      this.funcionalidade = <Funcionalidade>{
        fun_nome: "",
        fun_descricao:""
      }      
      this.navCtrl.setRoot('PerfilListPage');      
    }
  }

  editAcao(acao?: Acao) {
    let modal = this.modalCtrl.create('AcaoEditPage', { acao: acao });
    modal.present({
      ev: event
    });
  }

  excluirAcao(key) {
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
            this.acaoSrvc.delete(key).then(() => {
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

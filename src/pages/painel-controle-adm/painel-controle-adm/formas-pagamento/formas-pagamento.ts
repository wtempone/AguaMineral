
import { FormaPagamento } from './../../../../providers/database/models/forma-pagamento';
import { FormaPagamentoService } from './../../../../providers/database/services/forma-pagamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { UsuarioService } from '../../../../providers/database/services/usuario';


@IonicPage()
@Component({
  selector: 'page-formas-pagamento',
  templateUrl: 'formas-pagamento.html',
})
export class FormasPagamentoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public usuarioSrvc: UsuarioService,
    public formaPagamentoSrvc: FormaPagamentoService
  ) {
  }

  editFormaPagamento(formaPagamento?: FormaPagamento) {
    let modal = this.modalCtrl.create('FormaPagamentoEditPage', { formaPagamento: formaPagamento });
    modal.present({
      ev: event
    });
  }

  configurarFormaPagamento(formaPagamento){
    this.navCtrl.push('FormaPagamentoConfigPage',{ formaPagamento: formaPagamento});
  }

  excluirFormaPagamento(key) {
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
            this.formaPagamentoSrvc.delete(key).then(() => {
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

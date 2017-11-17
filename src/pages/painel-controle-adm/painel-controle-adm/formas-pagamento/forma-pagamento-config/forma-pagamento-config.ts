
import { TipoPagamento } from './../../../../../providers/database/models/tipo-pagamento';
import { TipoPagamentoService } from './../../../../../providers/database/services/tipo-pagamento';
import { FormaPagamento } from './../../../../../providers/database/models/forma-pagamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forma-pagamento-config',
  templateUrl: 'forma-pagamento-config.html',
})
export class FormaPagamentoConfigPage {
  formaPagamento: FormaPagamento;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tipoPagamentoSrvc: TipoPagamentoService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    if (this.navParams.data.formaPagamento) {
      this.formaPagamento = this.navParams.data.formaPagamento;    
      this.tipoPagamentoSrvc.getAll(this.formaPagamento.$key);
    } else {
      this.formaPagamento = <FormaPagamento>{
        pag_descricao:""
      }      
      this.navCtrl.setRoot('PerfilListPage');      
    }
  }

  editTipoPagamento(tipoPagamento?: TipoPagamento) {
    let modal = this.modalCtrl.create('TipoPagamentoEditPage', { tipoPagamento: tipoPagamento });
    modal.present({
      ev: event
    });
  }

  excluirTipoPagamento(key) {
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
            this.tipoPagamentoSrvc.delete(key).then(() => {
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

import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { Distribuidor } from '../../../providers/database/models/distribuidor';
import { DistribuidorProdutoService } from '../../../providers/database/services/distribuidor-produto';
import { DistribuidorProduto } from '../../../providers/database/models/distribuidor-produto';

@IonicPage()
@Component({
  selector: 'page-catalogo-produto-distribuidor',
  templateUrl: 'catalogo-produto-distribuidor.html',
})
export class CatalogoProdutoDistribuidorPage {
  distribuidor: Distribuidor;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public distribuidorProdutoSrvc: DistribuidorProdutoService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    
  ) {
    console.log(navParams.data);
    if (navParams.data.key) {
      this.mudarDistribuidor(this.navParams.data.key);
    }

  }
 mudarDistribuidor(key: string) {
    if (key) {
      this.distribuidorSrvc.get(key).take(1).subscribe((distribuidor: Distribuidor)=>{
        this.distribuidor = distribuidor;
        this.refresh();
      })
    }
  }

  refresh(){
    this.distribuidorProdutoSrvc.getAll(this.distribuidor.$key);
  }

  editDistribuidorProduto(distribuidorProduto?: DistribuidorProduto) {
    let modal = this.modalCtrl.create('DistribuidorProdutoEditPage', { distribuidorProduto:distribuidorProduto });
    modal.present({
      ev: event
    });
  }

  excluirDistribuidorProduto(key) {
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
            this.distribuidorProdutoSrvc.delete(key).then(() => {
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

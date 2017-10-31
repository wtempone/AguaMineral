import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { MarcaService } from '../../../../providers/database/services/marca';
import { ProdutoService } from '../../../../providers/database/services/produto';
import { Observable } from 'rxjs/Observable';
import { Marca } from '../../../../providers/database/models/marca';

@IonicPage()
@Component({
  selector: 'page-catalogo-produtos',
  templateUrl: 'catalogo-produtos.html',
})
export class CatalogoProdutosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public marcaSrvc: MarcaService,
    public produtoSrvc: ProdutoService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
  }

  
  editMarca(obs?: Observable<Marca>) {
    obs.take(1).subscribe(marca => {
      let modal = this.modalCtrl.create('MarcaEditPage', { marca: marca });
      modal.present({
        ev: event
      });
    });
  }

  removerMarca(obs?: Observable<Marca>) {
    obs.take(1).subscribe(marca => {

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
              this.marcaSrvc.delete(marca.$key).then(() => {
                ;
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
    });
  }

}

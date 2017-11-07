import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CatalogoProdutoDistribuidorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo-produto-distribuidor',
  templateUrl: 'catalogo-produto-distribuidor.html',
})
export class CatalogoProdutoDistribuidorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoProdutoDistribuidorPage');
  }

}

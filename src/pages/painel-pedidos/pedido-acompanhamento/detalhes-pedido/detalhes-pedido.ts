import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-pedido',
  templateUrl: 'detalhes-pedido.html',
})
export class DetalhesPedidoPage {
  pedido
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data) {
      this.pedido = this.navParams.data;
    }
  }

}

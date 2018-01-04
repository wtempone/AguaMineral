import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../../providers/database/services/pedido';
import { Distribuidor } from '../../../providers/database/models/distribuidor';
import { Pedido } from '../../../providers/database/models/pedido';


@IonicPage()
@Component({
  selector: 'page-pedidos-distribuidor',
  templateUrl: 'pedidos-distribuidor.html',
})
export class PedidosDistribuidorPage {
  distribuidor: Distribuidor;
  pedidos: Pedido[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoSrvc: PedidoService
  ) {
    if (this.navParams.data) {
      this.distribuidor = this.navParams.data;
      this.pedidoSrvc.pedidos.subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos.filter(x => x.distribuidor.key == this.distribuidor.$key)
      })
    }
  }
  evoluirPedido(pedido) {
    this.navCtrl.push('PedidosDitstribuidorEvoluirPage',pedido);
  }
}

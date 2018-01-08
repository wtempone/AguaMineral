import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../../providers/database/services/pedido';
import { Distribuidor } from '../../../providers/database/models/distribuidor';
import { Pedido, DicionarioStatusPedido } from '../../../providers/database/models/pedido';


@IonicPage()
@Component({
  selector: 'page-pedidos-distribuidor',
  templateUrl: 'pedidos-distribuidor.html',
})
export class PedidosDistribuidorPage {
  distribuidor: Distribuidor;
  pedidos: Pedido[];
  pedidosEmAndamento: Pedido[];
  pedidosEncerrados: Pedido[];
  viewPedidos = 'EmAndamento';
  dicionarioStatusPedido = DicionarioStatusPedido;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoSrvc: PedidoService
  ) {
    if (this.navParams.data) {
      this.distribuidor = this.navParams.data;
      this.pedidoSrvc.pedidos.subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos.filter(x => x.distribuidor.key == this.distribuidor.$key)
        this.pedidosEmAndamento = this.pedidos.filter(x => x.status != 5 && x.status != 6)
        this.pedidosEncerrados = this.pedidos.filter(x => !(x.status != 5 && x.status != 6))
      })
    }
  }
  evoluirPedido(pedido) {
    this.navCtrl.push('PedidosDitstribuidorEvoluirPage',pedido);
  }
}

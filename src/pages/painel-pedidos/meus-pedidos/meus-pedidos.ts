import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../../providers/database/services/usuario';
import { PedidoService } from '../../../providers/database/services/pedido';
import { Distribuidor } from '../../../providers/database/models/distribuidor';
import { Pedido,DicionarioStatusPedido } from '../../../providers/database/models/pedido';

@IonicPage()
@Component({
  selector: 'page-meus-pedidos',
  templateUrl: 'meus-pedidos.html',
})
export class MeusPedidosPage {

  pedidos: Pedido[];
  dicionarioStatusPedido = DicionarioStatusPedido;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoSrvc: PedidoService,
    public usuarioSrvc: UsuarioService
  ) {
    if (this.usuarioSrvc.usuarioAtual) {
      this.pedidoSrvc.pedidos.subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos.filter(x => x.usuario.key == this.usuarioSrvc.usuarioAtual.key)
      })          
    }
  }

  acompanharPedido(pedido) {
    this.navCtrl.push('PedidoAcompanhamentoPage',pedido.$key);
  }
}

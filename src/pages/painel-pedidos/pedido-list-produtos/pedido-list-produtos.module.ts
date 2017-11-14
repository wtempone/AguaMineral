import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoListProdutosPage } from './pedido-list-produtos';

@NgModule({
  declarations: [
    PedidoListProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoListProdutosPage),
  ],
})
export class PedidoListProdutosPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoAcompanhamentoPage } from './pedido-acompanhamento';

@NgModule({
  declarations: [
    PedidoAcompanhamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoAcompanhamentoPage),
  ],
})
export class PedidoAcompanhamentoPageModule {}

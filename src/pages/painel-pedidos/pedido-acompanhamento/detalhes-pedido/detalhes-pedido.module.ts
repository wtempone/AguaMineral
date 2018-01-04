import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesPedidoPage } from './detalhes-pedido';

@NgModule({
  declarations: [
    DetalhesPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesPedidoPage),
  ],
})
export class DetalhesPedidoPageModule {}

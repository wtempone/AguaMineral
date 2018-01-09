import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesPedidoPage } from './detalhes-pedido';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    DetalhesPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesPedidoPage),
    MomentModule,
  ],
})
export class DetalhesPedidoPageModule {}

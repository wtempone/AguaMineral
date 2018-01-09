import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusPedidosPage } from './meus-pedidos';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    MeusPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusPedidosPage),
    MomentModule,
  ],
})
export class MeusPedidosPageModule {}

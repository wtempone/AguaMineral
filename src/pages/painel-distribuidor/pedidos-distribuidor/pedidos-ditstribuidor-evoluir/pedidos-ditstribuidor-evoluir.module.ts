import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosDitstribuidorEvoluirPage } from './pedidos-ditstribuidor-evoluir';
import { ComponentsModule } from '../../../../components/components.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    PedidosDitstribuidorEvoluirPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosDitstribuidorEvoluirPage),
    ComponentsModule,  
    MomentModule,              
  ],
})
export class PedidosDitstribuidorEvoluirPageModule {}

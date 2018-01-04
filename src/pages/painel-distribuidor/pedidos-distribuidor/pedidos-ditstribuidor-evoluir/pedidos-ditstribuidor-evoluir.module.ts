import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosDitstribuidorEvoluirPage } from './pedidos-ditstribuidor-evoluir';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    PedidosDitstribuidorEvoluirPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosDitstribuidorEvoluirPage),
    ComponentsModule,            
  ],
})
export class PedidosDitstribuidorEvoluirPageModule {}

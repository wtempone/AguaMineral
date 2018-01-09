import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesPedidoDistribuidorPage } from './detalhes-pedido-distribuidor';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    DetalhesPedidoDistribuidorPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesPedidoDistribuidorPage),
    MomentModule,    
  ],
})
export class DetalhesPedidoDistribuidorPageModule {}

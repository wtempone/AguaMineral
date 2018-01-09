import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoAcompanhamentoPage } from './pedido-acompanhamento';
import { ComponentsModule } from '../../../components/components.module';
import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    PedidoAcompanhamentoPage,    
  ],
  imports: [
    IonicPageModule.forChild(PedidoAcompanhamentoPage),
    ComponentsModule,        
    MomentModule,
  ],
})
export class PedidoAcompanhamentoPageModule {}

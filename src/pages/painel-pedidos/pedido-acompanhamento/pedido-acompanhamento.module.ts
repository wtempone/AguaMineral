import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoAcompanhamentoPage } from './pedido-acompanhamento';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    PedidoAcompanhamentoPage,    
  ],
  imports: [
    IonicPageModule.forChild(PedidoAcompanhamentoPage),
    ComponentsModule,        
  ],
})
export class PedidoAcompanhamentoPageModule {}

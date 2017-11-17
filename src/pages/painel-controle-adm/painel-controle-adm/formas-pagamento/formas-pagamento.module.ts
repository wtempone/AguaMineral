import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormasPagamentoPage } from './formas-pagamento';

@NgModule({
  declarations: [
    FormasPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormasPagamentoPage),    
  ],
})
export class FormasPagamentoPageModule {}

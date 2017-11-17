import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoPagamentoEditPage } from './tipo-pagamento-edit';

@NgModule({
  declarations: [
    TipoPagamentoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoPagamentoEditPage),
  ],
})
export class TipoPagamentoEditPageModule {}

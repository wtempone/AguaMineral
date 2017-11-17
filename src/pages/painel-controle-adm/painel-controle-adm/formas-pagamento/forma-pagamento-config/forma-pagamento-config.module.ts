import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagamentoConfigPage } from './forma-pagamento-config';

@NgModule({
  declarations: [
    FormaPagamentoConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaPagamentoConfigPage),
  ],
})
export class FormaPagamentoConfigPageModule {}

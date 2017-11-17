import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagamentoEditPage } from './forma-pagamento-edit';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    FormaPagamentoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaPagamentoEditPage),
    TranslateModule.forChild(),
    ComponentsModule    
    
  ],
})
export class FormaPagamentoEditPageModule {}

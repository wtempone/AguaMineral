import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoPagamentoEditPage } from './tipo-pagamento-edit';
import { ComponentsModule } from '../../../../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TipoPagamentoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoPagamentoEditPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class TipoPagamentoEditPageModule {}

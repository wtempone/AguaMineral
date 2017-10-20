import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcaoListPage } from './acao-list';

@NgModule({
  declarations: [
    AcaoListPage,
  ],
  imports: [
    IonicPageModule.forChild(AcaoListPage),
  ],
})
export class AcaoListPageModule {}

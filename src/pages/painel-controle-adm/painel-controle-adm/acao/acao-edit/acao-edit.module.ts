import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcaoEditPage } from './acao-edit';

@NgModule({
  declarations: [
    AcaoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AcaoEditPage),
  ],
})
export class AcaoEditPageModule {}

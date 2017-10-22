import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectMenuPage } from './select-menu';

@NgModule({
  declarations: [
    SelectMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectMenuPage),
  ],
})
export class SelectMenuPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFilterPage } from './select-filter';

@NgModule({
  declarations: [
    SelectFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFilterPage),
  ],
})
export class SelectFilterPageModule {}

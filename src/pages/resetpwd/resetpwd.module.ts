import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetpwdPage } from './resetpwd';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ResetpwdPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetpwdPage),
    TranslateModule.forChild()    
  ],
})
export class ResetpwdPageModule {}

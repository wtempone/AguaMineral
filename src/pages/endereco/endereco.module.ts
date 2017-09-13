import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoPage } from './endereco';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    EnderecoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoPage),
    TranslateModule.forChild()
  ],
})
export class EnderecoPageModule {}

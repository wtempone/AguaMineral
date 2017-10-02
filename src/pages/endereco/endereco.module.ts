import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoPage } from './endereco';
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    EnderecoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoPage),
    TranslateModule.forChild(),
    DirectivesModule
  ],
})
export class EnderecoPageModule {}

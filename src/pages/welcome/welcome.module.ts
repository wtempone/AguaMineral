import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { TranslateModule } from "@ngx-translate/core";
import { EnderecoPage } from "../endereco/endereco";
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    WelcomePage,
    EnderecoPage
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    TranslateModule.forChild(),
    DirectivesModule
  ],
})
export class WelcomePageModule {}

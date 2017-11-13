import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    TranslateModule.forChild(),
    DirectivesModule,
    ComponentsModule,
  ],
})
export class WelcomePageModule {}

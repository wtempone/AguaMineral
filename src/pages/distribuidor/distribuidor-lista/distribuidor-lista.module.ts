import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistribuidorListaPage } from './distribuidor-lista';
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
  declarations: [
    DistribuidorListaPage,
  ],
  imports: [
    IonicPageModule.forChild(DistribuidorListaPage),
    TranslateModule.forChild(),
    DirectivesModule
    
  ],
})
export class DistribuidorListaPageModule {}

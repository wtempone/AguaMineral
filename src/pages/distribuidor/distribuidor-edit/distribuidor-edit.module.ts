import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistribuidorEditPage } from './distribuidor-edit';
import { BrowserModule } from "@angular/platform-browser/src/browser";
import { ImageCropperModule } from "ng2-img-cropper";

@NgModule({
  declarations: [
    DistribuidorEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DistribuidorEditPage),
    TranslateModule.forChild(),
    DirectivesModule,
    ComponentsModule,
    ImageCropperModule    
  ],
})

export class DistribuidorEditPageModule {}

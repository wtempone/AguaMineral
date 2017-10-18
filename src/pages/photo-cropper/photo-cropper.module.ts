import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoCropperPage } from './photo-cropper';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { ImageCropperModule } from "ng2-img-cropper";

@NgModule({
  declarations: [
    PhotoCropperPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoCropperPage),
    TranslateModule.forChild(),
    ComponentsModule,
    ImageCropperModule            
  ],
})
export class PhotoCropperPageModule {}

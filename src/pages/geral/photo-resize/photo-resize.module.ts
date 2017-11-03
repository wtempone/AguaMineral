import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoResizePage } from './photo-resize';
import { LyResizingCroppingImageModule } from 'angular2-resizing-cropping-image';

@NgModule({
  declarations: [
    PhotoResizePage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoResizePage),
    LyResizingCroppingImageModule
  ],
})
export class PhotoResizePageModule {}

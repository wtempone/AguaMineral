import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcaEditPage } from './marca-edit';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    MarcaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MarcaEditPage),
    ComponentsModule,
  ],
})
export class MarcaEditPageModule {}

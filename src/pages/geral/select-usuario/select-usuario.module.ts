import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectUsuarioPage } from './select-usuario';

@NgModule({
  declarations: [
    SelectUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectUsuarioPage),
  ],
})
export class SelectUsuarioPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilConfigPage } from './perfil-config';

@NgModule({
  declarations: [
    PerfilConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilConfigPage),
  ],
})
export class PerfilConfigPageModule {}

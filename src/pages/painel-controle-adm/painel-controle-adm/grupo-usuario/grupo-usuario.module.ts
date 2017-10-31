import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrupoUsuarioPage } from './grupo-usuario';

@NgModule({
  declarations: [
    GrupoUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(GrupoUsuarioPage),
  ],
})
export class GrupoUsuarioPageModule {}

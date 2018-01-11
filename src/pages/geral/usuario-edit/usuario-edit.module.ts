import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioEditPage } from './usuario-edit';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UsuarioEditPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioEditPage),
    ComponentsModule,
  ],
})
export class UsuarioEditPageModule {}

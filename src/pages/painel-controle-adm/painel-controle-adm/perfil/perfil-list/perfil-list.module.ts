import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilListPage } from './perfil-list';

@NgModule({
  declarations: [
    PerfilListPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilListPage),
  ],
})
export class PerfilListPageModule {}

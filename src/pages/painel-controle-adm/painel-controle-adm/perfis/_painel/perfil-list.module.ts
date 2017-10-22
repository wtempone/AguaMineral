import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilListPage } from './perfil-list';

@NgModule({
  declarations: [
    PerfilListPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilListPage),
    TranslateModule.forChild(),        
  ],
})
export class PerfilListPageModule {}

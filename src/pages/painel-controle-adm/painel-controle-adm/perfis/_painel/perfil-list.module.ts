import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilListPage } from './perfil-list';
import { DirectivesModule } from '../../../../../directives/directives.module';

@NgModule({
  declarations: [
    PerfilListPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilListPage),
    TranslateModule.forChild(),
    DirectivesModule 
  ],
})
export class PerfilListPageModule {}

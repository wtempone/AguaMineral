import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEditPage } from './perfil-edit';

@NgModule({
  declarations: [
    PerfilEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEditPage),
    TranslateModule.forChild(),
    
  ],
})
export class PerfilEditPageModule {}

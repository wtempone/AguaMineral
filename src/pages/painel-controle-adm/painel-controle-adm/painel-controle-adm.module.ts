import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelControleAdmPage } from './painel-controle-adm';
import { PerfilListPageModule } from './perfis/_painel/perfil-list.module';

@NgModule({
  declarations: [
    PainelControleAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelControleAdmPage),
    PerfilListPageModule
  ],
})
export class PainelControleAdmPageModule {}

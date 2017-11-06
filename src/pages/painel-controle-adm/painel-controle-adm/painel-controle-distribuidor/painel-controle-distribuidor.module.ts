import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelControleDistribuidorPage } from './painel-controle-distribuidor';

@NgModule({
  declarations: [
    PainelControleDistribuidorPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelControleDistribuidorPage),
    TranslateModule.forChild(),    
    
  ],
})
export class PainelControleDistribuidorPageModule {}

import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelControleDistribuidorConfigPage } from './painel-controle-distribuidor-config';

@NgModule({
  declarations: [
    PainelControleDistribuidorConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelControleDistribuidorConfigPage),
    TranslateModule.forChild(),    
  ],
})
export class PainelControleDistribuidorConfigPageModule {}

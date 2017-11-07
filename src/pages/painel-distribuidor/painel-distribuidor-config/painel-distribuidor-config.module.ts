import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelDistribuidorConfigPage } from './painel-distribuidor-config';

@NgModule({
  declarations: [
    PainelDistribuidorConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelDistribuidorConfigPage),
    TranslateModule.forChild(),    
  ],
})
export class PainelDistribuidorConfigPageModule {}

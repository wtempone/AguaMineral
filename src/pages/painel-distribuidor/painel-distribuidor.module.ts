import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelDistribuidorPage } from './painel-distribuidor';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PainelDistribuidorPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelDistribuidorPage),
    DirectivesModule
    
  ],
})
export class PainelDistribuidorPageModule {}

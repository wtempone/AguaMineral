import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionalidadeConfigPage } from './funcionalidade-config';

@NgModule({
  declarations: [
    FuncionalidadeConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionalidadeConfigPage),
  ],
})
export class FuncionalidadeConfigPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionalidadeListPage } from './funcionalidade-list';

@NgModule({
  declarations: [
    FuncionalidadeListPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionalidadeListPage),
  ],
})
export class FuncionalidadeListPageModule {}

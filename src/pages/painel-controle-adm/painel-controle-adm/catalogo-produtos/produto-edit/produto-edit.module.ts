import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoEditPage } from './produto-edit';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    ProdutoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoEditPage),
    ComponentsModule,
    
  ],
})
export class ProdutoEditPageModule {}

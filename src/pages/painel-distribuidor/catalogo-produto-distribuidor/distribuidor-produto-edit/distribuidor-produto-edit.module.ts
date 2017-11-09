import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistribuidorProdutoEditPage } from './distribuidor-produto-edit';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    DistribuidorProdutoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DistribuidorProdutoEditPage),
    TranslateModule.forChild(),        
    ComponentsModule,
    
  ],
})
export class DistribuidorProdutoEditPageModule {}

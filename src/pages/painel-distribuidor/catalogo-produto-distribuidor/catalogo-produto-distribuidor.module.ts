import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoProdutoDistribuidorPage } from './catalogo-produto-distribuidor';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CatalogoProdutoDistribuidorPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoProdutoDistribuidorPage),
    TranslateModule.forChild(),    
    
  ],
})
export class CatalogoProdutoDistribuidorPageModule {}

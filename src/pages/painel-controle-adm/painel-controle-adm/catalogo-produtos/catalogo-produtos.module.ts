import { ComponentsModule } from './../../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoProdutosPage } from './catalogo-produtos';

@NgModule({
  declarations: [
    CatalogoProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoProdutosPage),
    ComponentsModule
  ],
})
export class CatalogoProdutosPageModule {}

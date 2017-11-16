import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarProdutoCarrinhoPage } from './adicionar-produto-carrinho';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    AdicionarProdutoCarrinhoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarProdutoCarrinhoPage),
    ComponentsModule,    
  ],
})
export class AdicionarProdutoCarrinhoPageModule {}

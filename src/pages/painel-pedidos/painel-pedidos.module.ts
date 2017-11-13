import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelPedidosPage } from './painel-pedidos';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PainelPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelPedidosPage),
    TranslateModule.forChild(),
    DirectivesModule    
  ],
})
export class PainelPedidosPageModule {}

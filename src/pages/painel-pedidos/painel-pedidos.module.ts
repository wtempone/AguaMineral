import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelPedidosPage } from './painel-pedidos';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../directives/directives.module';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [
    PainelPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelPedidosPage),
    TranslateModule.forChild(),
    DirectivesModule,
    Ng2OrderModule,    
  ],
})
export class PainelPedidosPageModule {}

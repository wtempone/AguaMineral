import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosDistribuidorPage } from './pedidos-distribuidor';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PedidosDistribuidorPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosDistribuidorPage),
    TranslateModule.forChild(),        
  ],
})
export class PedidosDistribuidorPageModule {}

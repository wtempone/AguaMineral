import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosDistribuidorPage } from './pedidos-distribuidor';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    PedidosDistribuidorPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosDistribuidorPage),
    TranslateModule.forChild(),      
    MomentModule,      
  ],
})
export class PedidosDistribuidorPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaEditPage } from './categoria-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoriaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaEditPage),
    TranslateModule.forChild(),        
    
  ],
})
export class CategoriaEditPageModule {}

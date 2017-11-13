import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoAutoCompletePage } from './endereco-auto-complete';

@NgModule({
  declarations: [
    EnderecoAutoCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoAutoCompletePage),
  ],
})
export class EnderecoAutoCompletePageModule {}

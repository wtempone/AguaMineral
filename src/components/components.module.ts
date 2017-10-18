import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from './../directives/directives.module';
import { NgModule } from '@angular/core';
import { EnderecoComponent } from './endereco/endereco';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [EnderecoComponent,
    EnderecoComponent,
    EnderecoComponent],
	imports: [
        DirectivesModule,
        CommonModule,
        IonicPageModule,
        TranslateModule.forChild()                
    ],
	exports: [EnderecoComponent,
    EnderecoComponent,
    EnderecoComponent]
})
export class ComponentsModule {}

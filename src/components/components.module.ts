import { ImageCropperComponent, ImageCropperModule } from 'ng2-img-cropper';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from './../directives/directives.module';
import { NgModule } from '@angular/core';
import { EnderecoComponent } from './endereco/endereco';
import { CommonModule } from '@angular/common';
import { InputPhotoComponent } from './input-photo/input-photo';
import { UsuarioToolbarComponent } from './usuario-toolbar/usuario-toolbar';
import { OrderByGeneralComponent } from './order-by-general/order-by-general';
@NgModule({
	declarations: [EnderecoComponent,
    EnderecoComponent,
    EnderecoComponent,
    InputPhotoComponent,
    UsuarioToolbarComponent,
    OrderByGeneralComponent,
    ],
	imports: [
        DirectivesModule,
        CommonModule,
        IonicPageModule,
        TranslateModule.forChild(),
        ImageCropperModule          
    ],
	exports: [EnderecoComponent,
    EnderecoComponent,
    EnderecoComponent,
    InputPhotoComponent,
    UsuarioToolbarComponent,
    OrderByGeneralComponent,
    ]
})
export class ComponentsModule {}

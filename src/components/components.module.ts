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
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SelectProdutoComponent } from './select-produto/select-produto';
import { EnderecoAutocompleteComponent } from './endereco-autocomplete/endereco-autocomplete';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { CounterInputComponent } from './counter-input/counter-input';
import { SelectPhotoComponent } from './select-photo/select-photo';
import { TimelineComponentModule } from './timeline/timeline.module';
import { Timer } from './countdown-timer/timer';
import { TimerProgress } from './timer-progress/timer-progress';
import { ExpandableHeader } from './expandable-header/expandable-header';
import { FlashCardComponent } from './flash-card/flash-card';
import { AccordionListComponent } from './accordion-list/accordion-list';
export const components = [
    Timer,
    TimerProgress,
    ExpandableHeader,
    FlashCardComponent,
    AccordionListComponent,
  ];

@NgModule({
	declarations: [EnderecoComponent,
    EnderecoComponent,
    EnderecoComponent,
    InputPhotoComponent,
    UsuarioToolbarComponent,
    OrderByGeneralComponent,
    SelectProdutoComponent,
    EnderecoAutocompleteComponent,
    CounterInputComponent,
    SelectPhotoComponent,
    components
 ],
	imports: [
        DirectivesModule,
        CommonModule,
        IonicPageModule,
        TranslateModule.forChild(),
        ImageCropperModule,
        Ng2ImgMaxModule,
        
    ],
	exports: [EnderecoComponent,
    EnderecoComponent,
    EnderecoComponent,
    InputPhotoComponent,
    UsuarioToolbarComponent,
    OrderByGeneralComponent,
    SelectProdutoComponent,
    EnderecoAutocompleteComponent,
    CounterInputComponent,
    SelectPhotoComponent,
    components, TimelineComponentModule]
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { InputMaskDirective } from './input-mask/input-mask';
import { ControleAcessoDirective } from './controle-acesso/controle-acesso';
@NgModule({
	declarations: [InputMaskDirective,
    ControleAcessoDirective,
    ],
	imports: [],
	exports: [InputMaskDirective,
    ControleAcessoDirective,
    ]
})
export class DirectivesModule {}

import { Usuario } from './../../providers/database/models/usuario';
import { Funcionalidade } from './../../providers/database/models/funcionalidade';
import { Observable } from 'rxjs/Observable';
import { ViewController, NavController } from 'ionic-angular';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Directive, ElementRef, ViewContainerRef, Output } from '@angular/core';
import { Storage } from '@ionic/storage';

@Directive({
  selector: '[controle-acesso]' // Attribute selector
})
export class ControleAcessoDirective {
  acesso
  constructor(
    private elemento: ElementRef,
    private usuarioSrvc: UsuarioService,
    private viewContainer: ViewContainerRef,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.acesso = elemento.nativeElement.getAttribute('controle-acesso');
  }

  // ngOnInit() {
  //   let teste = this.validaAcesso(this.navCtrl.getActive().name, this.acesso);
  // }

  // validaAcesso(mnemonico: string, acesso: string): boolean {
  //   let temAcesso: boolean = false;
  //   if (!this.usuarioSrvc.usuarioAtual) {
  //     this.storage.get("_keyUsuarioAtual").then((key: string) => {
  //       if (key) {
  //         this.usuarioSrvc.loadPerfisAcesso(key).then(() => {
  //           temAcesso = this.verificaAcesso(mnemonico, acesso);
  //         })
  //       } else {
  //         temAcesso = false;
  //       }
  //     })
  //   } else {
  //     temAcesso = this.verificaAcesso(mnemonico, acesso);
  //   }
  //   return temAcesso;
  // }

  // verificaAcesso(mnemonico: string, acesso: string): boolean {
  //   let temAcesso: boolean = false;
  //   if (this.usuarioSrvc.usuarioAtual.usr_funcionalidades) {
  //     if (this.usuarioSrvc.usuarioAtual.usr_funcionalidades.filter(
  //       x => x.fun_mnemonico.toLocaleUpperCase() == mnemonico.toUpperCase())
  //       .filter(x => x.fun_acoes.filter(a => a.aca_mnemonico.toUpperCase() == acesso.toUpperCase())).length > 0) {
  //       temAcesso = true;
  //     }

  //     console.log(`mnemonico: ${mnemonico}`)
  //     console.log(`acesso: ${acesso}`)
  //     console.log(`temAcesso: ${temAcesso}`)
  //   }

  //   return temAcesso;
  // }
}


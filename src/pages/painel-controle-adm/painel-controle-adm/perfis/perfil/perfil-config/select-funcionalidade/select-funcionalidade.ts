import { Funcionalidade } from './../../../../../../../providers/database/models/funcionalidade';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-select-funcionalidade',
  templateUrl: 'select-funcionalidade.html',
})
export class SelectFuncionalidadePage {
  funcionalidades: Funcionalidade[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (this.navParams.data.funcionalidades) {
      this.funcionalidades = this.navParams.data.funcionalidades
    }
  }

  pronto(){
    let funcionalidadesSelecionadas: Funcionalidade[] = []
    this.funcionalidades.forEach(funcionalidade => {
      if (funcionalidade._selecionada) {
        funcionalidadesSelecionadas.push(funcionalidade);
      }
    });
      this.viewCtrl.dismiss({funcionalidadesSelecionadas: funcionalidadesSelecionadas});
  }
}

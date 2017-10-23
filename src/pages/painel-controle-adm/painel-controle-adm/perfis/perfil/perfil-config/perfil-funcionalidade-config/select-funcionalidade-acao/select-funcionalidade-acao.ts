import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Acao } from '../../../../../../../../providers/database/models/acao';

/**
 * Generated class for the SelectFuncionalidadeAcaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-funcionalidade-acao',
  templateUrl: 'select-funcionalidade-acao.html',
})
export class SelectFuncionalidadeAcaoPage {
  acoes: Acao[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController    
  ) {
    if (this.navParams.data.acoes) {
      this.acoes = this.navParams.data.acoes
    }
  }
  pronto(){
    let acoesSelecionadas: Acao[] = []
    this.acoes.forEach(acao => {
      if (acao._selecionada) {
        acoesSelecionadas.push(acao);
      }
    });
      this.viewCtrl.dismiss({acoesSelecionadas: acoesSelecionadas});
  }

}

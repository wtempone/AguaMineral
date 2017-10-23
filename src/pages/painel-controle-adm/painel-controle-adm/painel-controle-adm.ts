import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-painel-controle-adm',
  templateUrl: 'painel-controle-adm.html',
})
export class PainelControleAdmPage {

  perfilListPage = 'PerfilListPage';
  emConstrucaoPage = 'EmConstrucaoPage';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(`pagina atual:${this.navCtrl.getActive()}`)
  }

}

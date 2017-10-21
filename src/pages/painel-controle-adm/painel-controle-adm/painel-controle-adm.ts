import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PainelControleAdmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-painel-controle-adm',
  templateUrl: 'painel-controle-adm.html',
})
export class PainelControleAdmPage {

  perfilListPage = 'PerfilListPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PainelControleAdmPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilAcessoService } from '../../../../../providers/database/services/perfil-acesso';

/**
 * Generated class for the PerfilListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-list',
  templateUrl: 'perfil-list.html',
})
export class PerfilListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public perfilAcessoSrvc: PerfilAcessoService)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilListPage');
  }

}

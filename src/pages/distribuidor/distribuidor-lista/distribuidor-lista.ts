import { UsuarioService } from './../../../providers/database/services/usuario';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DistribuidorListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribuidor-lista',
  templateUrl: 'distribuidor-lista.html',
})
export class DistribuidorListaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistribuidorListaPage');
  }

}

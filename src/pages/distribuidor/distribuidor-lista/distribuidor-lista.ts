import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { UsuarioService } from './../../../providers/database/services/usuario';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
    public usuarioSrvc: UsuarioService,
    public modalCtrl: ModalController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistribuidorListaPage');
  }

  editDistribuidor(distribuidor: Distribuidor){
    this.navCtrl.push('DistribuidorEditPage',distribuidor)
  }
}

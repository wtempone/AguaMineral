import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    private modalCtrl: ModalController
  ) { }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }

  signup() {
    this.modalCtrl.create('SignupPage').present();
  }
  selectEndereco(endereco) {
    console.log(endereco);
  }

}

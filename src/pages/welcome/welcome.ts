import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MainPage } from '../pages'

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
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) { }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }

  signup() {
    this.modalCtrl.create('SignupPage').present();
  }
  selectEndereco(endereco) {
    console.log(endereco);
    this.navCtrl.push(MainPage)
  }

}

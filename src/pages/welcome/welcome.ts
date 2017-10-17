import { UsuarioService } from './../../providers/database/services/usuario';
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
    private navCtrl: NavController,
    public usuarioSrvc: UsuarioService
  ) { }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }
  show(){
    console.log(this.usuarioSrvc.usuarioAtual);
  }
  signup() {
    this.modalCtrl.create('SignupPage').present();
  }
  selectEndereco(endereco) {
    console.log(endereco);
    console.log(this.usuarioSrvc.usuarioAtual);
    if (this.usuarioSrvc.usuarioAtual) {
      this.usuarioSrvc.usuarioAtual.usr_endereco = endereco;
      this.usuarioSrvc.update(Object.keys(this.usuarioSrvc.usuarioAtual)[0], this.usuarioSrvc.usuarioAtual)
    }
    
    this.navCtrl.push(MainPage)

  }

}

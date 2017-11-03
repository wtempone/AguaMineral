import { AuthServiceProvider } from './../../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-menu-usuario',
  templateUrl: 'menu-usuario.html',
})
export class MenuUsuarioPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public viewCtrl: ViewController
  ) {
    
  }

  editarPerfil(fieldOrder) {
    this.viewCtrl.dismiss({ option: "editarPerfil" });
  }

  sair(){
    this.viewCtrl.dismiss({ option: "sair" });
  }

}

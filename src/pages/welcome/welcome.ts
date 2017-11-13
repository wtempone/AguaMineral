import { DistribuidorService } from './../../providers/database/services/distribuidor';
import { Distribuidor } from './../../providers/database/models/distribuidor';
import { Endereco } from './../../providers/database/models/shared-models';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MainPage } from '../pages'
import { Http, Response } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public usuarioSrvc: UsuarioService,
    public http: Http,
    public distribuidorSrvc: DistribuidorService,
  ) { }

  selectEndereco(endereco) {
    console.log(endereco);
    console.log(this.usuarioSrvc.usuarioAtual);
  
    this.updateEndereco(endereco);
    this.navCtrl.push('DistribuidorListaPage')
  }
  
  updateEndereco(endereco:Endereco){
      if (!this.usuarioSrvc.usuarioAtual.usr_endereco) {
        this.usuarioSrvc.usuarioAtual.usr_endereco = [];
      }
      this.usuarioSrvc.usuarioAtual.usr_endereco.push(endereco);      
      this.usuarioSrvc.set(this.usuarioSrvc.usuarioAtual.$key, this.usuarioSrvc.usuarioAtual)    
  }

  signupDistribuidora(){
    if (this.usuarioSrvc.usuarioAtual){
      this.navCtrl.push('DistribuidorEditPage')      
    } else {
      this.modalCtrl.create('LoginPage',{message:"NOT_AUTHENTICATED"}).present(); 
    }
  }
}

import { PerfilAcessoService } from './../../../../providers/database/services/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grupo-usuario',
  templateUrl: 'grupo-usuario.html',
})
export class GrupoUsuarioPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public perfilAcessoSrvc: PerfilAcessoService
  ) {
    console.log(this.perfilAcessoSrvc.perfisAcesso);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupoUsuarioPage');
  }

}

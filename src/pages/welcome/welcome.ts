import { DistribuidorService } from './../../providers/database/services/distribuidor';
import { Distribuidor } from './../../providers/database/models/distribuidor';
import { Endereco } from './../../providers/database/models/geral';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MainPage } from '../pages'
import { Http, Response } from '@angular/http';


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
    public usuarioSrvc: UsuarioService,
    public http: Http,
    public distribuidorSrvc: DistribuidorService
  ) { }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }

  show() {
    if (1 == 1) return;
    this.http.get('assets/dados/aguamineralapp_full.json')
      .map((res: Response) => res.json()).subscribe((dados) => {
        console.log(dados);
        if (dados) {
          if (dados.distribuidor) {
            let distribuidores: Distribuidor[] = [];
            if (dados.distribuidor.length > 0) {
              dados.distribuidor.forEach((distribuidor) => {
                this.distribuidorSrvc.create(<Distribuidor>{
                  dist_nome: distribuidor.dist_nome,
                  dist_cnpj: distribuidor.dist_cnpj,
                  dist_telefone: distribuidor.dist_telefone,
                  dist_celular: distribuidor.dist_celular,
                  dist_email: distribuidor.dist_email,
                  dist_img: distribuidor.dist_img,
                  dist_data: distribuidor.dist_data,
                  dist_update_data: distribuidor.dist_update_data,
                  dist_status: distribuidor.dist_status,
                  dist_online: distribuidor.dist_online,
                  dist_endereco: <Endereco> {
                    cep: distribuidor.dist_cep,
                    numero: distribuidor.dist_numero,
                    complemento: "",
                    rua: distribuidor.dist_endereco,
                    bairro: distribuidor.dist_bairro,
                    cidade: distribuidor.dist_cidade,
                    estado: distribuidor.dist_estado,
                    latitude: distribuidor.dist_latitude,
                    longitude: distribuidor.dist_longitude
                  }
                  
                })
              })
            }
          }
        }
      });
  }
 
  signup() {
    this.modalCtrl.create('SignupPage').present();
  }

  selectEndereco(endereco) {
    console.log(endereco);
    console.log(this.usuarioSrvc.usuarioAtual);
  
    this.updateEndereco(endereco);
    this.navCtrl.push('DistribuidorListaPage')
  }
  
  updateEndereco(endereco:Endereco){
      this.usuarioSrvc.usuarioAtual.usr_endereco = endereco;
      this.usuarioSrvc.update(this.usuarioSrvc.usuarioAtual.$key, this.usuarioSrvc.usuarioAtual)    
  }
}

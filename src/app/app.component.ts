import { AuthServiceProvider } from './../providers/auth-service';
import { Usuario } from './../providers/database/models/usuario';
import { Funcionalidade, MenuAcesso } from './../providers/database/models/perfil-acesso';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';


import { DistribuidorService } from '../providers/database/services/distribuidor';
import { Distribuidor } from '../providers/database/models/distribuidor';
import { Endereco } from '../providers/database/models/shared-models';
import { UsuarioService } from '../providers/database/services/usuario';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { MarcaService, Marca } from "../providers/database/database-providers";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  menus: MenuAcesso[] = []

  constructor(private translate: TranslateService,
    private platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private modalCtrl: ModalController,
    public usuarioSrvc: UsuarioService,
    public http: Http,
    public distribuidorSrvc: DistribuidorService,
    public marcaSrvc: MarcaService,
    public authServiceProvider:AuthServiceProvider
  ) {
    this.initTranslate();
    this.authServiceProvider
    if (this.authServiceProvider.afAuth.auth.currentUser) {
      this.usuarioSrvc.loadUsuarioAtualByEmail(this.authServiceProvider.afAuth.auth.currentUser.email);
    }
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {

    this.translate.setDefaultLang('pt-br');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang() ? 'pt' : 'pt-br');
    } else {
      this.translate.use('pt-br');
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(menu: MenuAcesso) {
    this.nav.setRoot(menu.mnu_page);
  }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }

  signupDistribuidora(){
    if (this.usuarioSrvc.usuarioAtual){
      this.nav.setRoot('DistribuidorEditPage')      
    } else {
      this.modalCtrl.create('LoginPage',{message:"NOT_AUTHENTICATED"}).present(); 
    }
  }
  show() {
    if (1 == 1) return;
    this.http.get('assets/dados/aguamineralapp_full.json')
      .map((res: Response) => res.json()).subscribe((dados) => {
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
          if (1 == 1) return;    
          if (dados.marcas) {
            let marcas: Marca[] = [];
            if (dados.marcas.length > 0) {
              dados.marcas.forEach((marca) => {
                console.log(marca)
                this.marcaSrvc.create(<Marca>{
                  mrc_nome: marca.mrc_nome
                })
              })
            }
          }
        }
      });
  }
}

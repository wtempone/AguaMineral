import { GoogleApis } from './../services/consulta-google-apis';
import { Marca } from './../providers/database/models/marca';
import { MarcaService } from './../providers/database/services/marca';
import { AuthServiceProvider } from './../providers/auth-service';
import { Usuario } from './../providers/database/models/usuario';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController, PopoverController } from 'ionic-angular';

import { Settings } from '../providers/providers';


import { DistribuidorService } from '../providers/database/services/distribuidor';
import { Distribuidor } from '../providers/database/models/distribuidor';
import { Endereco } from '../providers/database/models/shared-models';
import { UsuarioService } from '../providers/database/services/usuario';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { MenuAcesso } from '../providers/database/models/menu-acesso';
import { Storage } from '@ionic/storage';
import { PedidoService } from '../providers/database/services/pedido';
import { Pedido } from '../providers/database/models/pedido';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  splitPane: boolean = false;
  menu: boolean = true;
  menus: MenuAcesso[] = []
  exibeMenu = true;
  rootPage = WelcomePage;
  meusPedidos: Pedido[];
  numeroPedidos: number;
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
    public authServiceProvider: AuthServiceProvider,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public googleApis: GoogleApis,
    public storage: Storage,
    public pedidoSrvc: PedidoService,
    public alertCtrl: AlertController
  ) {
    this.initTranslate();
    this.splitPane = !this.platform.is('ios') && !this.platform.is('android');
  }
  ngOnInit() {
    this.reloadMenu();
  }

  reloadMenu() {
    if (this.splitPane) {
      this.menuCtrl.swipeEnable(false);
    }
    // Efetuar tratamento para pegar localizacao atual
    this.storage.get("_UsuarioAtual").then((usuario: Usuario) => {
      if (usuario) {
        this.usuarioSrvc.usuarioAtual = usuario;
        this.pedidoSrvc.pedidos.subscribe((pedidos: Pedido[]) => {
          this.meusPedidos = pedidos.filter(x => x.usuario.key == this.usuarioSrvc.usuarioAtual.key && (x.status != 5 && x.status != 6));
          this.numeroPedidos =  this.meusPedidos.length;
        })
        if (this.usuarioSrvc.usuarioAtual.usr_endereco)
          this.nav.setRoot('PainelPedidosPage');
      }
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  showMenu() {
    this.menu = !this.menu;
    if (!this.splitPane) {
      this.menuCtrl.toggle()
    }
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

  signup() {
    let modal = this.modalCtrl.create('SignupPage');
    modal.onDidDismiss(() => {
      if (this.usuarioSrvc.usuarioAtual.usr_endereco) {
        this.nav.setRoot('PainelPedidosPage');
      }
    })
    modal.present();
  }

  openPage(menu: MenuAcesso) {
    this.nav.setRoot(menu.mnu_page);
  }

  login() {
    let modal = this.modalCtrl.create('LoginPage');
    modal.onDidDismiss(() => {
      if (this.usuarioSrvc.usuarioAtual) {
        this.reloadMenu();
        if (this.usuarioSrvc.usuarioAtual.usr_endereco.length > 0)
          this.nav.setRoot('PainelPedidosPage');
      }
    })
    modal.present()
  }

  userOptions(event) {
    let popover = this.popoverCtrl.create('MenuUsuarioPage', { numeroPedidos: this.meusPedidos.length }, { cssClass: 'menu-popover' });
    popover.present({
      ev: event,
    });
    popover.onDidDismiss(data => {
      if (data)
        if (data.option) {
          if (data.option == "meusPedidos")
            this.nav.setRoot('MeusPedidosPage')
          if (data.option == "editarPerfil")
            this.editarPerfil();
          if (data.option == "sair") {
            this.confirmarSaida();
          }
        }
    })
  }
  
  confirmarSaida() {
    let alert = this.alertCtrl.create({
      title: 'Finalizar Sessão?',
      message: `Deseja finalizar a seção?`,
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: data => {
            this.authServiceProvider.signOut();
            this.nav.setRoot('WelcomePage')
          }
        }
      ]
    });
    alert.present();
  }

  signupDistribuidora() {
    if (this.usuarioSrvc.usuarioAtual) {
      this.nav.setRoot('DistribuidorEditPage')
    } else {
      let modal = this.modalCtrl.create('LoginPage', { message: "NOT_AUTHENTICATED" });
      modal.onDidDismiss(() => {
        if (this.usuarioSrvc.usuarioAtual)
          this.nav.setRoot('DistribuidorEditPage');
      })
      modal.present();
    }
  }

  verMeusPedidos() {
    this.nav.setRoot('MeusPedidosPage')
  }
  
  editarPerfil() {    
    this.nav.setRoot('UsuarioEditPage')
  }

  sair(){
    this.confirmarSaida();
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
                let dist = <Distribuidor>{
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
                  dist_endereco: <Endereco>{
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
                }
                if (!dist.dist_endereco.latitude || !dist.dist_endereco.longitude) {
                  this.googleApis.geocodeingEndereco(dist.dist_endereco).subscribe(dadosGoogle => {
                    //console.log(dadosGoogle);
                    if (dadosGoogle.results[0]) {
                      dist.dist_endereco.latitude = dadosGoogle.results[0].geometry.location.lat,
                        dist.dist_endereco.longitude = dadosGoogle.results[0].geometry.location.lng
                    }
                    this.distribuidorSrvc.create(dist);
                  })
                } else {
                  this.distribuidorSrvc.create(dist);
                }
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

import { PerfilUsuario } from './../../providers/database/models/perfil-usuario';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Distribuidor } from './../../providers/database/models/distribuidor';
import { DistribuidorService } from './../../providers/database/services/distribuidor';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { Content } from 'ionic-angular/navigation/nav-interfaces';

@IonicPage()
@Component({
  selector: 'page-painel-distribuidor',
  templateUrl: 'painel-distribuidor.html',
})
export class PainelDistribuidorPage {
  distribuidores: Distribuidor[] = [];
  distribuidor: Distribuidor;
  keyDistribuidor: any;

  catalogoProdutoDistribuidorPage = 'CatalogoProdutoDistribuidorPage';
  painelDistribuidorConfigPage = 'PainelDistribuidorConfigPage';
  @ViewChild("tab") tab: Tabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService
  ) {
    this.keyDistribuidor = this.usuarioSrvc.usuarioAtual.usr_distribuidores[0]
    this.carregaDistribuidor(this.keyDistribuidor);
  }

  carregaDistribuidor(key){
    this.distribuidorSrvc.get(key).subscribe((distribuidor:Distribuidor) =>{
      this.distribuidor = distribuidor;
    })
  }
  ionViewDidLoad() {

  }
  ngAfterViewInit() {
    this.carregaDistribuidor(this.keyDistribuidor);
    // setTimeout(() => {
    //   this.tab.select(0);
    // }, 100);
  }

}

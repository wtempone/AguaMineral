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
  distribuidores:Distribuidor[] = [];
  
  distribuidor: any;

  catalogoProdutoDistribuidorPage = 'CatalogoProdutoDistribuidorPage';
  painelDistribuidorConfigPage = 'PainelDistribuidorConfigPage';
  @ViewChild("tab") tab: Tabs;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService
  ) {
    (<any>Object).entries(this.usuarioSrvc.usuarioAtual.usr_perfis).filter(([key,value]) => value.per_distribuidora == true)
      .map(([key, value]) => {
        this.distribuidores = [];
        this.distribuidor = {key: value.per_keyDistribuidora};        
        this.distribuidorSrvc.get(value.per_keyDistribuidora).subscribe((distribuidor:Distribuidor) => {
          this.distribuidores.push(distribuidor);
        })
      })
  }
  ionViewDidLoad() {
    
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.tab.select(0);
    }, 100);
  }

}

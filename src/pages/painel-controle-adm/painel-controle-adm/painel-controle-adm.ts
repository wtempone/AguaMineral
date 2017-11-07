import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component, ViewChild } from '@angular/core';
import {  IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, Tabs } from 'ionic-angular';
import { Content } from 'ionic-angular/navigation/nav-interfaces';

@IonicPage()
@Component({
  selector: 'page-painel-controle-adm',
  templateUrl: 'painel-controle-adm.html',
})
export class PainelControleAdmPage {

  perfilListPage = 'PerfilListPage';
  grupoUsuarioPage = 'GrupoUsuarioPage';
  catalogoProdutosPage = 'CatalogoProdutosPage';
  painelControleDistribuidorPage = 'PainelControleDistribuidorPage';
  emConstrucaoPage = 'EmConstrucaoPage';
  
  @ViewChild("tab") tab: Tabs;
  
  distribuidorNaoHomoloado:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService
  ) {
    this.distribuidorSrvc.getByChild('dist_ativo',false).subscribe((distribuidores:Distribuidor[]) => {
      if (distribuidores.length > 0 ){
        this.distribuidorNaoHomoloado = distribuidores.length;        
      } else {
        this.distribuidorNaoHomoloado = null;
      }
    })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.tab.select(0);
    }, 100);
  }

}

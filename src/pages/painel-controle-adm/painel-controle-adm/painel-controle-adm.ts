import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  ionViewDidLoad() {
  }

}

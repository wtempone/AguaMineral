import { GoogleApis } from './../../services/consulta-google-apis';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DistribuidorService } from '../../providers/database/services/distribuidor';
import { Distribuidor } from '../../providers/database/models/distribuidor';

/**
 * Generated class for the PainelPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-painel-pedidos',
  templateUrl: 'painel-pedidos.html',
})
export class PainelPedidosPage {
  start;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrc: UsuarioService,
    public googleApis: GoogleApis
  ) {
    if (this.usuarioSrc.usuarioAtual.usr_endereco[0]) {
      if (this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude) {
        this.start = {
          lat: this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude,
          lng: this.usuarioSrc.usuarioAtual.usr_endereco[0].longitude
        }
      }
      this.distribuidorSrvc.distribuidores.subscribe((distribuidores: Distribuidor[]) => {
        distribuidores.map((distribuidor: Distribuidor) => {
          if (distribuidor.dist_endereco.latitude) {
            let end = {
              lat: distribuidor.dist_endereco.latitude,
              lng: distribuidor.dist_endereco.longitude
            }
            this.googleApis.calculateAndDisplayRoute(this.start,end).subscribe(ret => {
              console.log[ret];
            })
          }
        })
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PainelPedidosPage');
  }

}

import { DistribuidorService } from './../../providers/database/services/distribuidor';
import { Distribuidor } from './../../providers/database/models/distribuidor';
import { Endereco } from './../../providers/database/models/shared-models';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { MarcaService, Marca } from "../../providers/database/database-providers";
/**
 * Generated class for the UsuarioToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'usuario-toolbar',
  templateUrl: 'usuario-toolbar.html'
})
export class UsuarioToolbarComponent {

  text: string;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public usuarioSrvc: UsuarioService,
    public http: Http,
    public distribuidorSrvc: DistribuidorService,
    public marcaSrvc: MarcaService    
  ) {
    console.log('Hello UsuarioToolbarComponent Component');
    this.text = 'Hello World';
  }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }

  show() {
    //if (1 == 1) return;
    this.http.get('assets/dados/aguamineralapp_full.json')
      .map((res: Response) => res.json()).subscribe((dados) => {
        if (dados) {
          // if (dados.distribuidor) {
          //   let distribuidores: Distribuidor[] = [];
          //   if (dados.distribuidor.length > 0) {
          //     dados.distribuidor.forEach((distribuidor) => {
          //       this.distribuidorSrvc.create(<Distribuidor>{
          //         dist_nome: distribuidor.dist_nome,
          //         dist_cnpj: distribuidor.dist_cnpj,
          //         dist_telefone: distribuidor.dist_telefone,
          //         dist_celular: distribuidor.dist_celular,
          //         dist_email: distribuidor.dist_email,
          //         dist_img: distribuidor.dist_img,
          //         dist_data: distribuidor.dist_data,
          //         dist_update_data: distribuidor.dist_update_data,
          //         dist_status: distribuidor.dist_status,
          //         dist_online: distribuidor.dist_online,
          //         dist_endereco: <Endereco> {
          //           cep: distribuidor.dist_cep,
          //           numero: distribuidor.dist_numero,
          //           complemento: "",
          //           rua: distribuidor.dist_endereco,
          //           bairro: distribuidor.dist_bairro,
          //           cidade: distribuidor.dist_cidade,
          //           estado: distribuidor.dist_estado,
          //           latitude: distribuidor.dist_latitude,
          //           longitude: distribuidor.dist_longitude
          //         }
                  
          //       })
          //     })
          //   }
          // }
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

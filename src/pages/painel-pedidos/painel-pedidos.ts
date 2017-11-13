import { GoogleApis } from './../../services/consulta-google-apis';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DistribuidorService } from '../../providers/database/services/distribuidor';
import { Distribuidor } from '../../providers/database/models/distribuidor';

declare var google;


@IonicPage()
@Component({
  selector: 'page-painel-pedidos',
  templateUrl: 'painel-pedidos.html',
})
export class PainelPedidosPage {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  distanceMatrixService = new google.maps.DistanceMatrixService();
  origins;
  distribuidores: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrc: UsuarioService,
    public googleApis: GoogleApis
  ) {
    if (this.usuarioSrc.usuarioAtual.usr_endereco) {
      if (this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude) {
        this.origins = [];
        this.origins.push(new google.maps.LatLng(this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude, this.usuarioSrc.usuarioAtual.usr_endereco[0].longitude))
      }
      this.distribuidorSrvc.distribuidores.subscribe((distribuidores: Distribuidor[]) => {
        this.distribuidores = distribuidores;
        this.distribuidores.map((distribuidor) => {
          if (distribuidor.dist_endereco.latitude) {
            let destinations = []
            let destination = new google.maps.LatLng(distribuidor.dist_endereco.latitude, distribuidor.dist_endereco.longitude);
            destinations.push(destination)
            this.distanceMatrixService.getDistanceMatrix(
              {
                origins: this.origins,
                destinations: destinations,
                travelMode: 'DRIVING'
              }, (response, status) => {
                if (status == 'OK') {
                  console.log(response);                  
                  if (response.rows[0].elements[0].status == 'OK') {
                    distribuidor.dist_distancia_value = response.rows[0].elements[0].distance.value;
                    distribuidor.dist_distancia_text = response.rows[0].elements[0].distance.text;
                    distribuidor.dist_duracao_value  = response.rows[0].elements[0].duration.value;
                    distribuidor.dist_duracao_text = response.rows[0].elements[0].duration.text;
                  }
                }
              });
          }
        })
        /*
                for (let index = 0; index < destinations.length; index += 25) {
                  let partDestinations = destinations.slice(index, index + (index + 25 > destinations.length ? destinations.length - index : 25));
                  
                  this.distanceMatrixService.getDistanceMatrix(
                    {
                      origins: this.origins,
                      destinations: partDestinations,
                      travelMode: 'DRIVING'
                    }, (response, status) => {
                      if (status == 'OK') {
                        let dist_index = index
                        response.rows[0].elements.forEach(element => {
                          if (element.status == 'OK') {
                            this.distribuidores[dist_index].dist_distancia = element.distance.text;
                            this.distribuidores[dist_index].dist_duracao = element.duration.text;
                            }
                        });
                      }
                    });
                }
                console.log('this.distribuidores');
                console.log(this.distribuidores);
                */
      })
    }
  }

  calculateAndDisplayRoute(start, end) {
    this.directionsService.route({
      origin: `${start.lat},${start.lng}`,
      destination: `${end.lat},${end.lng}`,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        return response;
      } else {
        return response
      }
    });
  }

}

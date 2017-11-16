import { Distribuidor } from './../../providers/database/models/distribuidor';
import { GoogleApis } from './../../services/consulta-google-apis';
import { UsuarioService } from './../../providers/database/services/usuario';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DistribuidorService } from '../../providers/database/services/distribuidor';
declare var google;

export interface Coord {
  lat: number,
  lon: number
}

@IonicPage()
@Component({
  selector: 'page-painel-pedidos',
  templateUrl: 'painel-pedidos.html',
})
export class PainelPedidosPage {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  distanceMatrixService = new google.maps.DistanceMatrixService();
  autocompleteItems;
  autocomplete;
  autocompleteService = new google.maps.places.AutocompleteService();
  address;
  origins;
  view = 'distribuidores';
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  coordOrigin: Coord;
  distribuidores: any[] = [];
  distribuidoresBack: any[] = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrc: UsuarioService,
    public googleApis: GoogleApis,
    public modalCtrl: ModalController

  ) {
    this.address = {
      place: ''
    };
    this.refresh();
  }

  listaProdutos(distribuidor: Distribuidor) {
    this.navCtrl.push('PedidoListProdutosPage', distribuidor);
  }

  buscarDistribuidor(ev) {
    let val = ev.target.value;
    this.distribuidores = this.distribuidoresBack;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.distribuidores = this.distribuidores.filter((distribuidor) => {
        return (distribuidor.dist_nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  refresh() {
    if (this.usuarioSrc.usuarioAtual.usr_endereco) {
      if (this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude) {

        this.origins = [];
        this.origins.push(new google.maps.LatLng(this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude, this.usuarioSrc.usuarioAtual.usr_endereco[0].longitude))
        this.coordOrigin = <Coord>{
          lat: this.usuarioSrc.usuarioAtual.usr_endereco[0].latitude,
          lon: this.usuarioSrc.usuarioAtual.usr_endereco[0].longitude
        }
      }
      this.distribuidorSrvc.distribuidores.subscribe((distribuidores: any[]) => {
        distribuidores.map((distribuidor) => {
          if (distribuidor.dist_endereco.latitude) {
            let destinations = []
            let coordDestination = <Coord>{
              lat: distribuidor.dist_endereco.latitude,
              lon: distribuidor.dist_endereco.longitude
            }
            distribuidor.dist_distancia = this.clacDistance(this.coordOrigin, coordDestination, 'K');
          }
        })

        this.distribuidores = distribuidores.filter(dist => dist.dist_distancia < 10);
        this.distribuidoresBack = distribuidores.filter(dist => dist.dist_distancia < 10);
        
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
                  if (response.rows[0].elements[0].status == 'OK') {
                    distribuidor.dist_distancia_value = response.rows[0].elements[0].distance.value;
                    distribuidor.dist_distancia_text = response.rows[0].elements[0].distance.text;
                    distribuidor.dist_duracao_value = response.rows[0].elements[0].duration.value;
                    distribuidor.dist_duracao_text = response.rows[0].elements[0].duration.text;
                  }
                }
              });
          }
        })
      })
    }
  }

  refreshMap() {
    setTimeout(() => {
      let mapElement: HTMLElement = document.getElementById('map');

      if (this.mapElement) {

        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 12,
          center: { lat: this.coordOrigin.lat, lng: this.coordOrigin.lon },
        });
        if (this.distribuidores.length > 0) {
          var cityCircle = new google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 0.0,
            strokeWeight: 1,
            fillColor: '#0000FF',
            fillOpacity: 0.1,
            map: this.map,
            center: { lat: this.coordOrigin.lat, lng: this.coordOrigin.lon },
            radius: 10000
          });

          this.distribuidores.forEach((distribuidor: Distribuidor) => {

            var infowindow = new google.maps.InfoWindow({
              content: `<div class="img-mapa">
                          <img  src="${distribuidor.dist_img}"/>
                          <div class="img-mapa-title">${distribuidor.dist_nome}</div>
                          </div>`
            });
            let marker = new google.maps.Marker({
              map: this.map,
              position: {
                lat: distribuidor.dist_endereco.latitude,
                lng: distribuidor.dist_endereco.longitude
              },
              title: distribuidor.dist_nome,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            marker.addListener('click', function () {
              this.map.setZoom(17);
              this.map.panTo(marker.position);
              infowindow.open(this.map, marker);
            });

          })
        }
      }
    }, 100)
  }

  showAddressModal() {
    let modal = this.modalCtrl.create('EnderecoAutoCompletePage');
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }
  clacDistance(origin: Coord, destination: Coord, unit): number {
    var radlat1 = Math.PI * origin.lat / 180
    var radlat2 = Math.PI * destination.lat / 180
    var radlon1 = Math.PI * origin.lon / 180
    var radlon2 = Math.PI * destination.lon / 180
    var theta = origin.lon - destination.lon
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
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

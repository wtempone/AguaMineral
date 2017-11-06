import { FirebaseListObservable } from 'angularfire2/database';
import { Distribuidor } from './../../../../providers/database/models/distribuidor';
import { DistribuidorService } from './../../../../providers/database/services/distribuidor';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

declare var google;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@IonicPage()
@Component({
  selector: 'page-painel-controle-distribuidor',
  templateUrl: 'painel-controle-distribuidor.html',
})
export class PainelControleDistribuidorPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  distribuidoresOk: Distribuidor[] = null;
  distribuidoresPendentes: Distribuidor[] = null;
  config = 'ativas';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public modalCtrl: ModalController,
  ) {
    this.refresh();
  }

  refresh() {
    this.distribuidorSrvc.distribuidores.subscribe((distribuidores: Distribuidor[]) => {
      this.distribuidoresOk = distribuidores.filter(x => x.dist_ativo);
      this.distribuidoresPendentes = distribuidores.filter(x => !x.dist_ativo);
    })

  }

  congurarDistribuidor(distribuidor: Distribuidor) {
    this.navCtrl.push('PainelControleDistribuidorConfigPage', { distribuidor: distribuidor });
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    setTimeout(() => {
      let mapElement: HTMLElement = document.getElementById('map');

      if (this.mapElement) {

        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 4,
          center: { lat: -15.793889, lng: -57.882778 },
        });
        if (this.distribuidoresOk.length > 0) {
          this.distribuidoresOk.forEach((distribuidor: Distribuidor) => {

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
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });

            marker.addListener('click', function () {
              this.map.setZoom(17);
              this.map.panTo(marker.position);
              infowindow.open(this.map, marker);
            });

          })
        }
        if (this.distribuidoresPendentes.length > 0) {
          this.distribuidoresPendentes.forEach((distribuidor: Distribuidor) => {

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
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            marker.addListener('click', function () {
              this.map.setZoom(17);
              this.map.panTo(marker.position);
              infowindow.open(this.map, marker);
            });

          })
        }
        this.directionsDisplay.setMap(this.map);
      }
    }, 100)

  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}

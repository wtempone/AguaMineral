import { MenuAcesso } from './../../../../../../../providers/database/models/menu-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-select-menu',
  templateUrl: 'select-menu.html',
})
export class SelectMenuPage {
  menus: MenuAcesso[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    if (this.navParams.data.menus) {
      this.menus = this.navParams.data.menus
    }
  }

  pronto() {
    let menusSeleciondos: MenuAcesso[] = []
    this.menus.forEach(menu => {
      if (menu._selecionado) {
        menusSeleciondos.push(menu);
      }
    });
    this.viewCtrl.dismiss({ menusSelecionados: menusSeleciondos });
  }
}

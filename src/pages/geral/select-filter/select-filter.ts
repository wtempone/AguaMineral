import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SelectFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-filter',
  templateUrl: 'select-filter.html',
})
export class SelectFilterPage {
  listFields
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (navParams.data.listFields) {
      this.listFields = navParams.data.listFields;
    }
  }

  set(fieldOrder) {
    console.log(fieldOrder);
    this.viewCtrl.dismiss({ fieldOrder: fieldOrder });
  }
}

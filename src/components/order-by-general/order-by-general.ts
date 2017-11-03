import { PopoverController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'order-by-general',
  templateUrl: 'order-by-general.html'
})
export class OrderByGeneralComponent {
  @Input() listFields: any[];
  @Output() changeOrder = new EventEmitter()
  text: string;

  constructor(
    public popoverCtrl: PopoverController
  ) {

  }
  reorder(event) {
    let popover = this.popoverCtrl.create('SelectFilterPage', {listFields: this.listFields});
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      if (data)
        if (data.fieldOrder) {
          this.changeOrder.emit(data.fieldOrder);
        }
    })

  }  

}

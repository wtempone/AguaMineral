import { ModalController, Modal } from 'ionic-angular';
import { Component, ViewChild, Input } from '@angular/core';
@Component({
  selector: 'input-photo',
  templateUrl: 'input-photo.html',
})
export class InputPhotoComponent {
  modal: Modal
  data: any;
  @Input() value: any;
  @Input() format: any;
  constructor(
    public modalCtrl: ModalController,
  ) {

  }
  changePhoto() {
    this.modal = this.modalCtrl.create('PhotoCropperPage', { format: this.format });
    //this.modal = this.modalCtrl.create('PhotoResizePage',{format:this.format});
    this.modal.present();
    this.modal.onDidDismiss((img) => {
      this.value = img;
    })
  }


  fileChangeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.value = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  
}

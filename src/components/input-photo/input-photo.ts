import { ModalController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { PhotoProvider } from "../../providers/photo/photo";
@Component({
  selector: 'input-photo',
  templateUrl: 'input-photo.html',
})
export class InputPhotoComponent {
  modal
  data: any;
  
  constructor(
    private photoProvider: PhotoProvider,
    public modalCtrl: ModalController,
    
  ) {
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.modal = that.modalCtrl.create('PhotoCropperPage',image);
      that.modal.present();
    };
    myReader.readAsDataURL(file);
  }
}

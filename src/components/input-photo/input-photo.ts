import { ModalController, Modal } from 'ionic-angular';
import { Component, ViewChild, Input } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';

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
    private ng2ImgMax: Ng2ImgMaxService
  ) {

  }
  changePhoto() {
    this.modal = this.modalCtrl.create('PhotoCropperPage', { format: this.format });
    this.modal.present();
    this.modal.onDidDismiss((img) => {
      this.value = img;
    })
  }


  fileChangeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var fileInput: File = inputValue.files[0];
    this.ng2ImgMax.resizeImage(fileInput, 504, 504).subscribe(file => {
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.value = myReader.result;
      }
      myReader.readAsDataURL(file);
    });
  }

}

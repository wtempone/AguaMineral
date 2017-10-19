import { ViewController } from 'ionic-angular';
import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { PhotoProvider } from "../../../providers/photo/photo";


@IonicPage()
@Component({
  selector: 'page-photo-cropper',
  templateUrl: 'photo-cropper.html',
})
export class PhotoCropperPage {
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  data: any;
  cropperSettings: CropperSettings;
  thumbhailSize = 100;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private photoProvider: PhotoProvider

  ) {
    this.cropperSettings = new CropperSettings();


    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;

    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.imageCropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  handleCropping(event) {
    console.log(event)
  }

  setImage() {
    this.viewCtrl.dismiss(this.data.image);
  }

  selectImage() {
    this.photoProvider.selectImage()
      .then((data: any) => {
        let image: any = new Image();
        image.src = data;
        this.imageCropper.setImage(image);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

}

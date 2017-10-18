import { ViewController } from 'ionic-angular';
import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';


@IonicPage()
@Component({
  selector: 'page-photo-cropper',
  templateUrl: 'photo-cropper.html',
})
export class PhotoCropperPage {
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  data: any;
  cropperSettings: CropperSettings;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  ngOnInit() {
   // setTimeout(this.imageCropper.setImage(this.navParams.data),1000);
  }

  ionViewDidLoad() {
  }

  select(){
  }
}

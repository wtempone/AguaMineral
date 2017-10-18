import { EnderecoComponent } from './../../../components/endereco/endereco';
import { Endereco } from './../../../providers/database/models/geral';
import { MaskShared } from './../../../shared/masks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { UsuarioService } from './../../../providers/database/services/usuario';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { PhotoProvider } from "../../../providers/photo/photo";

@IonicPage()
@Component({
  selector: 'page-distribuidor-edit',
  templateUrl: 'distribuidor-edit.html',
})
export class DistribuidorEditPage {
  distribuidor: Distribuidor;
  formulario: FormGroup;
  data: any;
  cropperSettings: CropperSettings;

  @ViewChild(EnderecoComponent) endereco: EnderecoComponent;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService,
    private formBuilder: FormBuilder,
    private masks: MaskShared,
    private platform: Platform,
    private photoProvider: PhotoProvider
  ) {
    this.distribuidor = this.navParams.data;

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
    this.formulario = this.formBuilder.group({
      dist_nome: [null, Validators.required],
      dist_cnpj: [null, Validators.compose([Validators.required, Validators.pattern(this.masks.cnpj.pattern)])],
      dist_telefone: [null],
      dist_celular: [null],
      dist_email: [null, Validators.compose([Validators.required, Validators.email])]
    });

    this.formulario.patchValue({
      dist_nome: this.distribuidor.dist_nome,
      dist_cnpj: this.distribuidor.dist_cnpj,
      dist_telefone: this.distribuidor.dist_telefone,
      dist_email: this.distribuidor.dist_email
    });
  }

  verificaValidTouched(campo: string) {
    this.formulario.get(campo).errors;
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  saveDistribuidor() {
    if (this.formulario.valid) {
      this.distribuidor.dist_nome = this.formulario.get('dist_nome').value;
      this.distribuidor.dist_cnpj = this.formulario.get('dist_cnpj').value;
      this.distribuidor.dist_telefone = this.formulario.get('dist_telefone').value;
      this.distribuidor.dist_celular = this.formulario.get('dist_celular').value;
      this.distribuidor.dist_email = this.formulario.get('dist_email').value;
      this.distribuidor.dist_img = this.data.image;
      //this.distribuidor.dist_img = this.formulario.get('cep').value;
      this.distribuidor.dist_data = new Date(Date.now());
      this.distribuidor.dist_online = false;
      this.endereco.setAddress();
      let parsekey: any = this.distribuidor;
      if (parsekey.$key) {
        this.distribuidorSrvc.update(parsekey.$key, this.distribuidor)
      } else {
        this.distribuidorSrvc.create(this.distribuidor)
      }
    } else {
      this.endereco.setAddress();
      this.verificaValidacoesForm(this.formulario);
    }
  }

  selectEndereco(endereco: Endereco) {
    this.distribuidor.dist_endereco = endereco;
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

  verificaValidacoesForm(formGroup: FormGroup) {
    console.log(formGroup);
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

   selectImage()
   {
      this.photoProvider.selectImage()
      .then((data : any) =>
      {
         let image : any        = new Image();
         image.src 				= data;
         this.imageCropper.setImage(image);
      })
      .catch((error : any) =>
      {
         console.dir(error);
      });
   }


}

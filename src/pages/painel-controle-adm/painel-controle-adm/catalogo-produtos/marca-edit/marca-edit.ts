import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Marca } from '../../../../../providers/database/models/marca';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputPhotoComponent } from '../../../../../components/input-photo/input-photo';
import { MarcaService } from '../../../../../providers/database/services/marca';

@IonicPage()
@Component({
  selector: 'page-marca-edit',
  templateUrl: 'marca-edit.html',
})
export class MarcaEditPage {
  marca: Marca;
  formulario: FormGroup;

  @ViewChild(InputPhotoComponent) mrc_img: InputPhotoComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public marcaSrvc: MarcaService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    if (this.navParams.data.marca)
      this.marca = this.navParams.data.marca;
    else
      this.marca = <Marca>{
        mrc_nome: null,
        mrc_img: null
      }
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      mrc_nome: [null, Validators.required],
    });

    this.formulario.patchValue({
      mrc_nome: this.marca.mrc_nome,
    });
  }

  verificaValidTouched(campo: string) {
    this.formulario.get(campo).errors;
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
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

  salvarMarca() {
    if (this.formulario.valid) {
      this.marca.mrc_nome = this.formulario.get('mrc_nome').value;
      this.marca.mrc_img = this.mrc_img.value;

      let parsekey: any = this.marca;
      if (parsekey.$key) {
        this.marcaSrvc.update(parsekey.$key, this.marca).then(() => {
          this.mensagemFinal('Marca alterada com sucesso.');
        })
      } else {
        this.marcaSrvc.create(this.marca).then(() => {
          this.mensagemFinal('Marca criada com sucesso.');
        })
      }
    } else {
      this.verificaValidacoesForm(this.formulario);      
    }
  }

  mensagemFinal(mensagem) {

    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      cssClass: 'toast-success'
    });
    toast.present();
    this.navCtrl.pop();
  }

}

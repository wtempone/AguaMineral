import { TranslateService } from '@ngx-translate/core';
import { InputPhotoComponent } from './../../../components/input-photo/input-photo';
import { EnderecoComponent } from './../../../components/endereco/endereco';
import { Endereco } from './../../../providers/database/models/shared-models';
import { MaskShared } from './../../../shared/masks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { UsuarioService } from './../../../providers/database/services/usuario';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-distribuidor-edit',
  templateUrl: 'distribuidor-edit.html',
})
export class DistribuidorEditPage {
  distribuidor: Distribuidor;
  formulario: FormGroup;

  @ViewChild(EnderecoComponent) endereco: EnderecoComponent;
  @ViewChild(InputPhotoComponent) dist_img: InputPhotoComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService,
    private formBuilder: FormBuilder,
    private masks: MaskShared,
    private platform: Platform,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    if (this.navParams.data.distribuidor) {
      this.distribuidor = this.navParams.data.distribuidor;
    }
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      dist_nome: [null, Validators.required],
      dist_cnpj: [null, Validators.compose([Validators.required, Validators.pattern(this.masks.cnpj.pattern)])],
      dist_telefone: [null],
      dist_celular: [null],
      dist_email: [null, Validators.compose([Validators.required, Validators.email])],
      dist_taxa_entrega: [null],
    });

    this.formulario.patchValue({
      dist_nome: this.distribuidor.dist_nome,
      dist_cnpj: this.distribuidor.dist_cnpj,
      dist_telefone: this.distribuidor.dist_telefone,
      dist_email: this.distribuidor.dist_email,
      dist_taxa_entrega: this.distribuidor.dist_taxa_entrega
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

  saveDistribuidor() {
    if (this.formulario.valid) {

      this.endereco.getAddress().then((endereco: Endereco) => {
        if (endereco) {
          this.distribuidor.dist_nome = this.formulario.get('dist_nome').value;
          this.distribuidor.dist_cnpj = this.formulario.get('dist_cnpj').value;
          this.distribuidor.dist_telefone = this.formulario.get('dist_telefone').value;
          this.distribuidor.dist_celular = this.formulario.get('dist_celular').value;
          this.distribuidor.dist_email = this.formulario.get('dist_email').value;
          this.distribuidor.dist_taxa_entrega = this.formulario.get('dist_taxa_entrega').value;
          this.distribuidor.dist_img = this.dist_img.value;
          this.distribuidor.dist_data = new Date(Date.now());
          this.distribuidor.dist_online = false;
          this.distribuidor.dist_ativo = false;
          this.distribuidor.dist_endereco = endereco;
          let parsekey: any = this.distribuidor;
          if (parsekey.$key) {
            this.distribuidorSrvc.update(parsekey.$key, this.distribuidor).then(() => {

              this.translate.get("DIST_MESSAGE_UPDATE").subscribe((message) => {
                let toast = this.toastCtrl.create({
                  message: message,
                  duration: 3000,
                  position: 'top',
                  cssClass: 'toast-success'
                });
                toast.present();
                this.navCtrl.pop();
              });

            })
          } else {
            this.distribuidorSrvc.create(this.distribuidor).then(() => {
              this.translate.get("DIST_MESSAGE_CREATE").subscribe((message) => {
                this.translate.get([
                  "DIST_MESSAGE_CREATE_TITLE",
                  "DIST_MESSAGE_CREATE"
                ]
                  , { value: this.usuarioSrvc.usuarioAtual.usr_nome }).subscribe(
                  (values) => {
                    let confirm = this.alertCtrl.create({
                      title: values.DIST_MESSAGE_CREATE_TITLE,
                      message: values.DIST_MESSAGE_CREATE,
                      buttons: [
                        {
                          text: values.OK_BUTTON_TEXT,
                          handler: () => {
                          }
                        }
                      ]
                    });
                    confirm.present();
                    confirm.onDidDismiss(() => {
                      this.navCtrl.pop();
                    })
                  })
              });

            })
          }
        }
      });
    } else {
      this.endereco.getAddress();
      this.verificaValidacoesForm(this.formulario);
    }
  }

  selectEndereco(endereco: Endereco) {
    this.distribuidor.dist_endereco = endereco;
  }

}

import { PerfilAcessoService } from './../../../../../providers/database/services/perfil-acesso';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PerfilAcesso } from './../../../../../providers/database/models/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil-edit',
  templateUrl: 'perfil-edit.html',
})
export class PerfilEditPage {
  perfil: PerfilAcesso;
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private perfilSrvc: PerfilAcessoService
  ) {
    console.log(this.navParams.data)
    if (this.navParams.data.perfil)
      this.perfil = this.navParams.data.perfil;
    else
      this.perfil = <PerfilAcesso>{
        per_mnemonico: null,
        per_nome: null,
        per_descricao: null
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEditPage');
  }


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      per_mnemonico: [null, Validators.required],
      per_nome: [null, Validators.required],
      per_descricao: [null, Validators.required],
    });

    this.formulario.patchValue({
      per_mnemonico: this.perfil.per_mnemonico,
      per_nome: this.perfil.per_nome,
      per_descricao: this.perfil.per_descricao,
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
  save() {
    if (this.formulario.valid) {

      this.perfil.per_mnemonico = this.formulario.get('per_mnemonico').value;
      this.perfil.per_nome = this.formulario.get('per_nome').value;
      this.perfil.per_descricao = this.formulario.get('per_descricao').value;
      let parsekey: any = this.perfil;
      if (parsekey.$key) {
        this.perfilSrvc.update(parsekey.$key, this.perfil).then(() => {
          let toast = this.toastCtrl.create({
            message: 'Registro atualizado com sucesso',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success'
          });
          toast.present().then(() => this.navCtrl.pop());
        });
      } else {
        this.perfilSrvc.create(this.perfil).then(() => {
          let toast = this.toastCtrl.create({
            message: 'Registro criado com sucesso',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success'
          });
          toast.present();
          this.navCtrl.pop();
        })
      }
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
}

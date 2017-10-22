import { FuncionalidadeService } from './../../../../../../providers/database/services/funcionalidade';
import { PerfilAcessoService } from './../../../../../../providers/database/services/perfil-acesso';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Funcionalidade } from './../../../../../../providers/database/models/funcionalidade';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-funcionalidade-edit',
  templateUrl: 'funcionalidade-edit.html',
})
export class FuncionalidadeEditPage {
  funcionalidade: Funcionalidade;
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private funcionalidadeSrvc: FuncionalidadeService
  ) {
    if (this.navParams.data.funcionalidade)
      this.funcionalidade = this.navParams.data.funcionalidade;
    else
      this.funcionalidade = <Funcionalidade>{
        fun_mnemonico: null,
        fun_nome: null,
        fun_descricao: null
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEditPage');
  }


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      fun_mnemonico: [null, Validators.required],
      fun_nome: [null, Validators.required],
      fun_descricao: [null, Validators.required],
    });

    this.formulario.patchValue({
      fun_mnemonico: this.funcionalidade.fun_mnemonico,
      fun_nome: this.funcionalidade.fun_nome,
      fun_descricao: this.funcionalidade.fun_descricao,
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

      this.funcionalidade.fun_mnemonico = this.formulario.get('fun_mnemonico').value;
      this.funcionalidade.fun_nome = this.formulario.get('fun_nome').value;
      this.funcionalidade.fun_descricao = this.formulario.get('fun_descricao').value;
      this.funcionalidade.fun_mnemonico = this.funcionalidade.fun_mnemonico.toUpperCase();
      this.funcionalidadeSrvc.exists('fun_mnemonico',this.funcionalidade.fun_mnemonico, this.funcionalidade.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com este Mnemonico.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.funcionalidade;
          if (parsekey.$key) {
            this.funcionalidadeSrvc.update(parsekey.$key, this.funcionalidade).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro atualizado com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present().then(() => this.navCtrl.pop());
            }).catch(()=>{
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro na alteração do registro.',
                duration: 3000,
                position: 'top',
              });
              toast.present();              
            });;
          } else {
            this.funcionalidadeSrvc.create(this.funcionalidade).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro criado com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
              this.navCtrl.pop();
            }).catch(() => {
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro na criação do registro.',
                duration: 3000,
                position: 'top',
              });
              toast.present();          
            })
          }
        }
      })      
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
}

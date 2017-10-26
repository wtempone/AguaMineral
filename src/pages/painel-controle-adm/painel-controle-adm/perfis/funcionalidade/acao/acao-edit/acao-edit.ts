import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Acao } from './../../../../../../../providers/database/models/acao';
import { AcaoService } from './../../../../../../../providers/database/services/acao';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-acao-edit',
  templateUrl: 'acao-edit.html',
})
export class AcaoEditPage {
  acao: Acao;
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public acaoSrvc: AcaoService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,        
  ) {
    if (this.navParams.data.acao)
    this.acao = this.navParams.data.acao;
  else
    this.acao = <Acao>{
      aca_mnemonico: null,
      aca_nome: null,
      aca_descricao: null
    }    
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      aca_mnemonico: [null, Validators.required],
      aca_nome: [null, Validators.required],
      aca_descricao: [null, Validators.required],
    });

    this.formulario.patchValue({
      aca_mnemonico: this.acao.aca_mnemonico,
      aca_nome: this.acao.aca_nome,
      aca_descricao: this.acao.aca_descricao,
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

      this.acao.aca_mnemonico = this.formulario.get('aca_mnemonico').value;
      this.acao.aca_nome = this.formulario.get('aca_nome').value;
      this.acao.aca_descricao = this.formulario.get('aca_descricao').value;
      this.acaoSrvc.exists('aca_mnemonico',this.acao.aca_mnemonico, this.acao.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com esta ação.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.acao;
          if (parsekey.$key) {
            this.acaoSrvc.update(parsekey.$key, this.acao).then(() => {
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
            this.acaoSrvc.create(this.acao).then(() => {
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

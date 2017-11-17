import { FormaPagamentoService } from './../../../../../providers/database/services/forma-pagamento';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormaPagamento } from './../../../../../providers/database/models/forma-pagamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forma-pagamento-edit',
  templateUrl: 'forma-pagamento-edit.html',
})
export class FormaPagamentoEditPage {
  formaPagamento: FormaPagamento;
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private formaPagamentoSrvc: FormaPagamentoService
  ) {
    if (this.navParams.data.formaPagamento)
      this.formaPagamento = this.navParams.data.formaPagamento;
    else
      this.formaPagamento = <FormaPagamento>{
        pag_descricao: null,
        pag_mnemonico: null,
        pag_img: null,
      }

  }
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      pag_mnemonico: [null, Validators.required],
      pag_descricao: [null, Validators.required],
      pag_img: [null, Validators.required],      
    });

    this.formulario.patchValue({
      pag_mnemonico: this.formaPagamento.pag_mnemonico,
      pag_descricao: this.formaPagamento.pag_descricao,
      pag_img: this.formaPagamento.pag_img,
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

      this.formaPagamento.pag_mnemonico = this.formulario.get('pag_mnemonico').value;
      this.formaPagamento.pag_descricao = this.formulario.get('pag_descricao').value;
      this.formaPagamento.pag_img = this.formulario.get('pag_img').value;
      this.formaPagamentoSrvc.exists('pag_mnemonico',this.formaPagamento.pag_mnemonico, this.formaPagamento.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com este Mnemonico.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.formaPagamento;
          if (parsekey.$key) {
            this.formaPagamentoSrvc.update(parsekey.$key, this.formaPagamento).then(() => {
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
            this.formaPagamentoSrvc.create(this.formaPagamento).then(() => {
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


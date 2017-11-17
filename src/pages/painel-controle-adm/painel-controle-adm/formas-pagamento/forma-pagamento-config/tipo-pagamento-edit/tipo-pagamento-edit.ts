
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoPagamento } from './../../../../../../providers/database/models/tipo-pagamento';
import { TipoPagamentoService } from './../../../../../../providers/database/services/tipo-pagamento';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tipo-pagamento-edit',
  templateUrl: 'tipo-pagamento-edit.html',
})
export class TipoPagamentoEditPage {

  tipoPagamento: TipoPagamento;
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tipoPagamentoSrvc: TipoPagamentoService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,        
  ) {
    if (this.navParams.data.tipoPagamento)
    this.tipoPagamento = this.navParams.data.tipoPagamento;
  else
    this.tipoPagamento = <TipoPagamento>{
      tipopag_mnemonico: null,
      tipopag_descricao: null,
      tipopag_img: null
    }    
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      tipopag_mnemonico: [null, Validators.required],
      tipopag_descricao: [null, Validators.required],
      tipopag_img: [null, Validators.required],
    });

    this.formulario.patchValue({
      tipopag_mnemonico: this.tipoPagamento.tipopag_mnemonico,
      tipopag_descricao: this.tipoPagamento.tipopag_descricao,
      tipopag_img: this.tipoPagamento.tipopag_img,
    });
  }

  verificaValidTouched(campo: string) {
    this.formulario.get(campo).errors;
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaValidtiposPagamentoForm(formGroup: FormGroup) {
    console.log(formGroup);
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidtiposPagamentoForm(controle);
      }
    });
  }
  save() {
    if (this.formulario.valid) {

      this.tipoPagamento.tipopag_mnemonico = this.formulario.get('tipopag_mnemonico').value;
      this.tipoPagamento.tipopag_descricao = this.formulario.get('tipopag_descricao').value;
      this.tipoPagamento.tipopag_img = this.formulario.get('tipopag_img').value;
      this.tipoPagamentoSrvc.exists('tipopag_mnemonico',this.tipoPagamento.tipopag_mnemonico, this.tipoPagamento.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com esta ação.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.tipoPagamento;
          if (parsekey.$key) {
            this.tipoPagamentoSrvc.update(parsekey.$key, this.tipoPagamento).then(() => {
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
            this.tipoPagamentoSrvc.create(this.tipoPagamento).then(() => {
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
      this.verificaValidtiposPagamentoForm(this.formulario);
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { DistribuidorCategoria } from '../../../../providers/database/models/distribuidor-categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../../../providers/database/services/menu';
import { DistribuidorCategoriaService } from '../../../../providers/database/services/distribuidor-categoria';

@IonicPage()
@Component({
  selector: 'page-categoria-edit',
  templateUrl: 'categoria-edit.html',
})
export class CategoriaEditPage {
  categoria: DistribuidorCategoria;
  formulario: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private menuSrvc: MenuService,
    private popoverCtrl:PopoverController,
    private distribuidorCategoriaSrvc: DistribuidorCategoriaService
  ) {
    console.log(this.navParams.data)
    if (this.navParams.data.categoria)
      this.categoria = this.navParams.data.categoria;
    else
      this.categoria = <DistribuidorCategoria>{
        cat_nome: null   
      }
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cat_nome: [null, Validators.required],
    });

    this.formulario.patchValue({
      cat_nome: this.categoria.cat_nome,
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

      this.categoria.cat_nome = this.formulario.get('cat_nome').value;
      this.distribuidorCategoriaSrvc.exists('cat_nome',this.categoria.cat_nome, this.categoria.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com este nome.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.categoria;
          if (parsekey.$key) {
            this.distribuidorCategoriaSrvc.update(parsekey.$key, this.categoria).then(() => {
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
            this.distribuidorCategoriaSrvc.create(this.categoria).then(() => {
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

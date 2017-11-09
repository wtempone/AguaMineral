import { DistribuidorProduto } from './../../../../providers/database/models/distribuidor-produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-distribuidor-produto-edit',
  templateUrl: 'distribuidor-produto-edit.html',
})
export class DistribuidorProdutoEditPage {
  [x: string]: any;
  distribuidorProduto: DistribuidorProduto;
  formulario: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    console.log(this.navParams.data)
    if (this.navParams.data.distribuidorProduto)
      this.distribuidorProduto = this.navParams.data.distribuidorProduto;
    else
      this.distribuidorProduto = <DistribuidorProduto>{
        dist_produto: null,
        dist_preco: null,
        dist_categoria: null   
      }
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      dist_produto: [null, Validators.required],
      dist_preco: [null, Validators.required],
      dist_categoria: [null, Validators.required],
    });

    this.formulario.patchValue({
      dist_produto: this.distribuidorProduto.dist_produto,
      dist_preco: this.distribuidorProduto.dist_preco,
      dist_categoria: this.distribuidorProduto.dist_categoria,
    });
  }

  verificaValidTouched(campo: string) {
    this.formulario.get(campo).errors;
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  selecionarProduto(event) {
    let popover = this.popoverCtrl.create('CatalogoProdutosPage');
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      if (data)
        if (data.produto) {
          this.distribuidorProduto.dist_produto = data.produto
        }
    })

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

      this.distribuidorProduto.dist_produto = this.formulario.get('dist_produto').value;
      this.distribuidorProduto.dist_preco = this.formulario.get('dist_preco').value;
      this.distribuidorProduto.dist_categoria = this.formulario.get('dist_categoria').value;
      this.distribuidorProdutoSrvc.exists('dist_produto',this.distribuidorProduto.dist_produto, this.distribuidorProduto.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com este produto.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.distribuidorProduto;
          if (parsekey.$key) {
            this.distribuidorProdutoSrvc.update(parsekey.$key, this.distribuidorProduto).then(() => {
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
            this.distribuidorProdutoSrvc.create(this.distribuidorProduto).then(() => {
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

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Produto } from '../../../../../providers/database/models/produto';
import { InputPhotoComponent } from '../../../../../components/input-photo/input-photo';
import { ProdutoService } from '../../../../../providers/database/services/produto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../../../../providers/database/services/marca';
import { Marca } from '../../../../../providers/database/models/marca';

@IonicPage()
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})
export class ProdutoEditPage {
  produto: Produto;
  marcas: Marca[];
  formulario: FormGroup;

  @ViewChild(InputPhotoComponent) pro_img: InputPhotoComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoSrvc: ProdutoService,
    public marcaSrvc: MarcaService,    
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.marcaSrvc.marcas.subscribe(marcas => this.marcas = marcas);
    if (this.navParams.data.produto)
      this.produto = this.navParams.data.produto;
    else
      this.produto = <Produto>{
        pro_nome: null,
        pro_marca: null,
        pro_descricao: null
      }
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      pro_nome: [null, Validators.required],
      pro_marca: [null, Validators.required],
      pro_descricao: [null, Validators.required],
    });

    this.formulario.patchValue({
      pro_nome: this.produto.pro_nome,
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

  salvarProduto() {
    if (this.formulario.valid) {
      this.produto.pro_nome = this.formulario.get('pro_nome').value;
      this.produto.pro_descricao = this.formulario.get('pro_descricao').value;
      this.produto.pro_marca = this.formulario.get('pro_marca').value;
      this.produto.pro_img = this.pro_img.value;

      let parsekey: any = this.produto;
      if (parsekey.$key) {
        this.produtoSrvc.update(parsekey.$key, this.produto).then(() => {
          this.mensagemFinal('Produto alterado com sucesso.');
        })
      } else {
        this.produtoSrvc.create(this.produto).then(() => {
          this.mensagemFinal('Produto criado com sucesso.');
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

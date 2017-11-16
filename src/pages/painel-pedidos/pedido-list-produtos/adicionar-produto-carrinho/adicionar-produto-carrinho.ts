import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DistribuidorProduto } from '../../../../providers/database/models/distribuidor-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-adicionar-produto-carrinho',
  templateUrl: 'adicionar-produto-carrinho.html',
})
export class AdicionarProdutoCarrinhoPage {
  marca: any;
  distribuidorProduto: DistribuidorProduto;
  formulario: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public pedidosSrvc: PedidosService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    if (this.navParams.data)
      this.distribuidorProduto = this.navParams.data;
    else
      this.distribuidorProduto = <DistribuidorProduto>{
        dist_produto: null,
        dist_preco: 10.55,
        dist_categoria: null,
        dist_quantidade: null,
        dist_total: null,
        dist_observacao: null,
        produto: null,
        categoria: null,
      }

  }
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      dist_produto: [null],
      dist_preco: [null],
      dist_categoria: [null],
      dist_quantidade: [null],
      dist_total: [null],
      dist_observacao: [null],
      produto: [null],
      categoria: [null],
    });

    this.formulario.patchValue({
      dist_produto: this.distribuidorProduto.dist_produto,
      dist_preco: this.distribuidorProduto.dist_preco,
      dist_categoria: this.distribuidorProduto.dist_categoria,
      dist_quantidade: (this.distribuidorProduto.dist_quantidade ? this.distribuidorProduto.dist_quantidade : 1),
      dist_total: this.distribuidorProduto.dist_preco * (this.distribuidorProduto.dist_quantidade ? this.distribuidorProduto.dist_quantidade : 1),
      dist_observacao: this.distribuidorProduto.dist_observacao,
      produto: this.distribuidorProduto.produto,
      categoria: this.distribuidorProduto.categoria,
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
    /*
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
    }*/
  }

}

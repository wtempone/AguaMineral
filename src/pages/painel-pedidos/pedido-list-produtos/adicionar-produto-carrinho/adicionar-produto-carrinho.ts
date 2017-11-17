import { Distribuidor } from './../../../../providers/database/models/distribuidor';
import { Pedido } from './../../../../providers/database/models/pedido';
import { UsuarioService } from './../../../../providers/database/services/usuario';
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
  distribuidor: Distribuidor;
  carrinho: Pedido;
  formulario: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public pedidosSrvc: PedidosService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private usuarioSrvc: UsuarioService
  ) {
    if (this.navParams.data.distribuidorProduto) {
      this.distribuidorProduto = this.navParams.data.distribuidorProduto;
      this.distribuidor = this.navParams.data.distribuidor;
      this.carrinho = this.navParams.data.carrinho;
      if (this.carrinho.produtos) {
        if (this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.$key).length > 0) {
          this.distribuidorProduto = this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.$key)[0];
        }
      }
    }
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

  
  adicionarProduto() {
    if (!this.carrinho) {
      this.carrinho = <Pedido>{
        distribuidor: <Distribuidor>{
          dist_nome: this.distribuidor.dist_nome,
          dist_img: this.distribuidor.dist_img,
          dist_cnpj: this.distribuidor.dist_cnpj,
          dist_email: this.distribuidor.dist_email,
          dist_celular: this.distribuidor.dist_celular,
          dist_endereco: this.distribuidor.dist_endereco,
          dist_telefone: this.distribuidor.dist_telefone
        }
      };
    }
    if (!this.carrinho.produtos) {
      this.carrinho.produtos = [];
    }
    this.distribuidorProduto.dist_quantidade = this.formulario.get('dist_quantidade').value;
    this.distribuidorProduto.dist_total = this.distribuidorProduto.dist_preco * this.distribuidorProduto.dist_quantidade;

    if (this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.key).length > 0) {
      this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.key)[0].dist_quantidade = this.distribuidorProduto.dist_quantidade;
      this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.key)[0].dist_total = this.distribuidorProduto.dist_total;
    } else {
      this.distribuidorProduto.key = this.distribuidorProduto.$key;
      this.carrinho.produtos.push(this.distribuidorProduto);
    }
    this.atualizarCarrinho()
    this.navCtrl.pop();
  }

  atualizarCarrinho() {
    this.carrinho.total = 0;
    this.carrinho.produtos.forEach(x => {
      this.carrinho.total += x.dist_total;
    });
    this.usuarioSrvc.usuarioAtual.usr_carrinho = this.carrinho;
    this.usuarioSrvc.updateCarrinho(this.carrinho);
  }


}

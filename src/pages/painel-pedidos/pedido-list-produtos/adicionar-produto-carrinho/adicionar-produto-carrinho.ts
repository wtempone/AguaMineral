import { Distribuidor } from './../../../../providers/database/models/distribuidor';
import { Pedido } from './../../../../providers/database/models/pedido';
import { UsuarioService } from './../../../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DistribuidorProduto } from '../../../../providers/database/models/distribuidor-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage/es2015/storage';

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
  atualizar: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public pedidosSrvc: PedidosService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private usuarioSrvc: UsuarioService,
    public storage: Storage,
  ) {
    if (this.navParams.data.distribuidorProduto) {
      this.distribuidorProduto = this.navParams.data.distribuidorProduto;
      this.distribuidor = this.navParams.data.distribuidor;
      if (this.navParams.data.carrinho) {
        this.carrinho = this.navParams.data.carrinho;
        if (this.carrinho.produtos) {
          if (this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.$key).length > 0) {
            this.atualizar = true;
            this.distribuidorProduto = this.carrinho.produtos.filter(x => x.key == this.distribuidorProduto.$key)[0];
          } else {
            this.distribuidorProduto.dist_quantidade = 1;
          }
        } else {
          this.distribuidorProduto.dist_quantidade = 1;
        }
      } else {
        this.distribuidorProduto.dist_quantidade = 1;
      }
    }
    else
      this.distribuidorProduto = <DistribuidorProduto>{
        dist_produto: null,
        dist_preco: null,
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
      key: [null],
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
      key: this.distribuidorProduto.key,
      dist_produto: this.distribuidorProduto.dist_produto,
      dist_preco: this.distribuidorProduto.dist_preco,
      dist_categoria: this.distribuidorProduto.dist_categoria,
      dist_quantidade: this.distribuidorProduto.dist_quantidade,
      dist_total: this.distribuidorProduto.dist_preco * (this.distribuidorProduto.dist_quantidade ? this.distribuidorProduto.dist_quantidade : 1),
      dist_observacao: this.distribuidorProduto.dist_observacao,
      produto: this.distribuidorProduto.produto,
      categoria: this.distribuidorProduto.categoria,
    });

    this.formulario.get('dist_quantidade').valueChanges.subscribe(valor => {
      if (valor == 0) {
        let confirm = this.alertCtrl.create({
          title: 'Remover produto',
          message: 'Deseja remover o produto do carrinho?',
          buttons: [
            {
              text: 'Não',
              handler: () => {
                this.distribuidorProduto.dist_quantidade = 1
                this.distribuidorProduto.dist_total = this.distribuidorProduto.dist_preco;
              }
            },
            {
              text: 'Sim',
              handler: () => {
                if (this.distribuidorProduto.key && this.carrinho) {
                  this.carrinho.produtos.splice(
                    this.carrinho.produtos.findIndex(x => x.key == this.distribuidorProduto.key), 1
                  )
                }
                this.atualizarCarrinho();
                this.navCtrl.pop();
              }
            }
          ]
        });
        confirm.present();
      }
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
        duracao_value: (<any>this.distribuidor).dist_duracao_value,
        distancia_value: (<any>this.distribuidor).dist_distancia_value,
        duracao_text: (<any>this.distribuidor).dist_duracao_text,
        distancia_text: (<any>this.distribuidor).dist_distancia_text,
        distribuidor: <Distribuidor>{
          key: this.distribuidor.$key,
          dist_nome: this.distribuidor.dist_nome,
          dist_img: this.distribuidor.dist_img,
          dist_cnpj: this.distribuidor.dist_cnpj,
          dist_email: this.distribuidor.dist_email,
          dist_celular: this.distribuidor.dist_celular ? this.distribuidor.dist_celular : 0,
          dist_endereco: this.distribuidor.dist_endereco,
          dist_telefone: this.distribuidor.dist_telefone,
          dist_taxa_entrega: this.distribuidor.dist_taxa_entrega,
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
    this.carrinho.total += Number(this.carrinho.distribuidor.dist_taxa_entrega);
    this.storage.set('_PedidoTemporario',this.carrinho);
    // this.usuarioSrvc.usuarioAtual.usr_carrinho = this.carrinho;
    // this.usuarioSrvc.updateCarrinho(this.carrinho);
  }


}

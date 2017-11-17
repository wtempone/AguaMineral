import { DistribuidorProduto } from './../../../../providers/database/models/distribuidor-produto';
import { UsuarioService } from './../../../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Pedido } from '../../../../providers/database/models/pedido';
import { FirebaseObjectObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
  carrinho: Pedido;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    private alertCtrl: AlertController
  ) {
    if (this.navParams.data.carrinho) {
      this.carrinho = this.navParams.data.carrinho;
    }
  }
  adicionarMaisProdutos() {
    this.navCtrl.pop();
  }

  changeQuantidade(ev, index) {
    if (ev == 0) {
      let confirm = this.alertCtrl.create({
        title: 'Remover produto',
        message: 'Deseja remover o produto do carrinho?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              this.carrinho.produtos[index].dist_quantidade = 1
              this.carrinho.produtos[index].dist_total = this.carrinho.produtos[index].dist_preco;
              this.atualizarCarrinho();
            }            
          },
          {
            text: 'Sim',
            handler: () => {
              this.carrinho.produtos.splice(index, 1);
              this.atualizarCarrinho();
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.carrinho.produtos[index].dist_total = ev * this.carrinho.produtos[index].dist_preco;
      this.atualizarCarrinho();
    }
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

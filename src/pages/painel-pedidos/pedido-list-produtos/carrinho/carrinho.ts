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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    private alertCtrl: AlertController
  ) {
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
              this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos[index].dist_quantidade = 1
              this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos[index].dist_total = this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos[index].dist_preco;
              this.atualizarCarrinho();
            }            
          },
          {
            text: 'Sim',
            handler: () => {
              this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos.splice(index, 1);
              this.atualizarCarrinho();
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos[index].dist_quantidade = ev;
      this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos[index].dist_total = ev * this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos[index].dist_preco;
      this.atualizarCarrinho();
    }
  }

  limparCarrinho() {
    let confirm = this.alertCtrl.create({
      title: 'Confirma limpeza do carrinho?',
      message: 'Todos os produtos serão retirados do carrainho. Deseja continuar?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Limpar',
          handler: () => {
            this.excluirCarrinho();
          }
        }
      ]
    });
    confirm.present();
  }

  excluirCarrinho() {
    this.usuarioSrvc.usuarioAtual.usr_carrinho = null;
    this.usuarioSrvc.removeCarrinho();
    this.navCtrl.pop();
  }

  atualizarCarrinho() {
    this.usuarioSrvc.usuarioAtual.usr_carrinho.total = 0;    
    this.usuarioSrvc.usuarioAtual.usr_carrinho.produtos.forEach(x => {
      this.usuarioSrvc.usuarioAtual.usr_carrinho.total += x.dist_total;
    });
    this.usuarioSrvc.usuarioAtual.usr_carrinho.total += Number(this.usuarioSrvc.usuarioAtual.usr_carrinho.distribuidor.dist_taxa_entrega);

    this.usuarioSrvc.updateCarrinho(this.usuarioSrvc.usuarioAtual.usr_carrinho);
  }

  escolherFormaPagamento() {
    this.navCtrl.push('PedidoFormaPagamentoPage')
  }

}

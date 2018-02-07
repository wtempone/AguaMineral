import { DistribuidorProduto } from './../../../../providers/database/models/distribuidor-produto';
import { UsuarioService } from './../../../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Pedido } from '../../../../providers/database/models/pedido';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage/es2015/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

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
    private alertCtrl: AlertController,
    public storage: Storage,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewWillEnter() {
    this.storage.get('_PedidoTemporario').then((pedido: Pedido) => { this.carrinho = pedido});
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
      this.carrinho.produtos[index].dist_quantidade = ev;
      this.carrinho.produtos[index].dist_total = ev * this.carrinho.produtos[index].dist_preco;
      this.storage.set('_PedidoTemporario', this.carrinho)
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
    this.carrinho = null;
    //this.usuarioSrvc.removeCarrinho();
    this.storage.set('_PedidoTemporario', undefined)    
    this.navCtrl.pop();
  }

  atualizarCarrinho() {
    this.carrinho.total = 0;    
    this.carrinho.produtos.forEach(x => {
      this.carrinho.total += x.dist_total;
    });
    this.carrinho.total += Number(this.carrinho.distribuidor.dist_taxa_entrega);
    this.storage.set('_PedidoTemporario', this.carrinho)
    //this.usuarioSrvc.updateCarrinho(this.carrinho);
  }

  escolherFormaPagamento() {
    this.navCtrl.push('PedidoFormaPagamentoPage');
  }

}

import { Pedido } from './../../../providers/database/models/pedido';
import { UsuarioService } from './../../../providers/database/services/usuario';
import { Usuario } from './../../../providers/database/models/usuario';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { Distribuidor } from '../../../providers/database/models/distribuidor';
import { DistribuidorProdutoService } from '../../../providers/database/services/distribuidor-produto';
import { DistribuidorProduto } from '../../../providers/database/models/distribuidor-produto';
import { DistribuidorCategoriaService } from '../../../providers/database/services/distribuidor-categoria';
import { DistribuidorCategoria } from '../../../providers/database/models/distribuidor-categoria';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage/es2015/storage';

@IonicPage()
@Component({
  selector: 'page-pedido-list-produtos',
  templateUrl: 'pedido-list-produtos.html',
})
export class PedidoListProdutosPage {
  distribuidor: Distribuidor;
  configuracao = 'catalogo';
  carrinho: Pedido;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public distribuidorProdutoSrvc: DistribuidorProdutoService,
    public distribuidorCategoriaSrvc: DistribuidorCategoriaService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public usuarioSrvc: UsuarioService,
    public storage: Storage
  ) {
    if (this.navParams.data) {
      this.distribuidor = this.navParams.data;
      this.refresh();
    }
    this.storage.get('_PedidoTemporario').then((pedido: Pedido) => { this.carrinho = pedido })
  }

  ionViewWillEnter() {
    this.storage.get('_PedidoTemporario').then((pedido: Pedido) => { this.carrinho = pedido })
  }
  
  verCarrinho() {
    this.navCtrl.push('CarrinhoPage')
  }
  adicionarAoCarrinho(distribuidorProduto) {
    let modal = this.modalCtrl.create('AdicionarProdutoCarrinhoPage', {
      distribuidorProduto: distribuidorProduto,
      distribuidor: this.distribuidor,
      carrinho: this.carrinho,
    })
    modal.present({
      ev: event
    });
    modal.onDidDismiss(() => {
      this.storage.get('_PedidoTemporario').then((pedido: Pedido) => {
        this.carrinho = pedido;
      })
    })
  }
  refresh() {
    this.distribuidorProdutoSrvc.getAll(this.distribuidor.$key);
    this.distribuidorCategoriaSrvc.getAll(this.distribuidor.$key);
  }

  editDistribuidorProduto(distribuidorProduto?: DistribuidorProduto) {
    let modal = this.modalCtrl.create('DistribuidorProdutoEditPage', { distribuidorProduto: distribuidorProduto, distribuidorCategorias: this.distribuidorCategoriaSrvc.distribuidorCategorias });
    modal.present({
      ev: event
    });
  }

  excluirDistribuidorProduto(key) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.distribuidorProdutoSrvc.delete(key).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }


  editDistribuidorCategoria(categoria?: DistribuidorCategoria) {
    let modal = this.modalCtrl.create('CategoriaEditPage', { categoria: categoria });
    modal.present({
      ev: event
    });
  }

  excluirDistribuidorCategoria(key) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.distribuidorCategoriaSrvc.delete(key).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

}

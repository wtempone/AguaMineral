import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido, PedidoHistorico } from '../../../../providers/database/models/pedido';
import { UsuarioService } from '../../../../providers/database/services/usuario';
import { DistribuidorService } from '../../../../providers/database/services/distribuidor';
import { Distribuidor } from '../../../../providers/database/models/distribuidor';
import { DistribuidorFormaPagamento } from '../../../../providers/database/models/distribuidor-forma-pagamento';
import { FormaPagamento } from '../../../../providers/database/models/forma-pagamento';
import { FormaPagamentoService } from '../../../../providers/database/services/forma-pagamento';
import { TipoPagamentoService } from '../../../../providers/database/services/tipo-pagamento';
import { TipoPagamento } from '../../../../providers/database/models/tipo-pagamento';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { PedidoService } from '../../../../providers/database/services/pedido';
import { Usuario } from '../../../../providers/database/models/usuario';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-pedido-forma-pagamento',
  templateUrl: 'pedido-forma-pagamento.html',
})
export class PedidoFormaPagamentoPage {
  carrinho: Pedido;
  formasPagamento: FormaPagamento[];
  formaPagamentoStr: string;
  pedido: Pedido;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    public distribuidorSrvc: DistribuidorService,
    public formaPagamentoSrvc: FormaPagamentoService,
    public tipoPagamentoSrvc: TipoPagamentoService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public pedidoSrvc: PedidoService
  ) {
    let enderecosPadrao =  this.usuarioSrvc.usuarioAtual.usr_endereco.filter(x => x.padrao == true);
    if (enderecosPadrao.length > 0 ){
      this.usuarioSrvc.usuarioAtual.usr_carrinho.enderecoEntrega = enderecosPadrao[0];
    } else {
      this.usuarioSrvc.usuarioAtual.usr_carrinho.enderecoEntrega = this.usuarioSrvc.usuarioAtual.usr_endereco[0]
    }

    this.distribuidorSrvc.get(this.usuarioSrvc.usuarioAtual.usr_carrinho.distribuidor.key).take(1).subscribe((distribuidor: Distribuidor) => {
      if (!distribuidor.dist_formas_pagamento) {
        let alert = this.alertCtrl.create({
          title: 'Forma de pagamento não configurada',
          subTitle: 'Não é possível realizar o pedido para esta distribuidora, não há configuração de forma de pagamento.',
          buttons: ['Ok']
        });
        alert.present();
        this.navCtrl.pop();
        return;   
      }
      let formasPagamento = distribuidor.dist_formas_pagamento;
      this.formasPagamento = [];      
      formasPagamento.map((distFormaPagamento: DistribuidorFormaPagamento) => {
        this.formaPagamentoSrvc.get(distFormaPagamento.key).then((formaPagamento:FormaPagamento) => {
          if (formaPagamento.pag_mnemonico) {
            this.formasPagamento.push( <FormaPagamento> {
              pag_mnemonico: formaPagamento.pag_mnemonico,
              pag_descricao: formaPagamento.pag_descricao,
              pag_img: formaPagamento.pag_img,
              _selecionada: false
            })
            }
        })
      })
    })
  }

  modificarPedido() {
    this.navCtrl.pop();
  }

  
  changeFormaPagamento($event, iForma) {
    if (iForma == null) return;
    this.usuarioSrvc.usuarioAtual.usr_carrinho.formaPagamento = this.formasPagamento[iForma];
    if (this.formasPagamento[iForma].pag_mnemonico.toUpperCase() == 'DINHEIRO') {
      let confirm = this.alertCtrl.create({
        title: 'Dinheiro',
        message: 'Precisa de troco para seu pedido?',
        buttons: [
          {
            text: 'Não',
          },
          {
            text: 'Sim',
            handler: () => {
              this.obtemValorTroco();
              this.usuarioSrvc.updateCarrinho(this.usuarioSrvc.usuarioAtual.usr_carrinho);    
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.usuarioSrvc.updateCarrinho(this.usuarioSrvc.usuarioAtual.usr_carrinho);          
    }

  }

  obtemValorTroco() {
    let alert = this.alertCtrl.create({
      title: 'Troco para quanto?',
      message: `Seu pedito deu R$ ${this.usuarioSrvc.usuarioAtual.usr_carrinho.total}.
                Digite o valor que pagará em dinheiro para que o entregador leve seu troco.`,
      inputs: [
        {
          name: 'troco',
          placeholder: 'R$ 0,00',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Confirmar',
          handler: data => {
            if (data.troco) {
              if (data.troco < this.usuarioSrvc.usuarioAtual.usr_carrinho.total) {
                this.showToastMessage('O valor para troco não pode ser menor que o valor do pedito.')         
                return false;                
              } else {
                this.usuarioSrvc.usuarioAtual.usr_carrinho.troco = data.troco;          
              }
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  alterarEndereco() {

  }

  enviarPedido() {
    if (!this.usuarioSrvc.usuarioAtual.usr_carrinho.formaPagamento) {
      this.showToastMessage('Selecione uma forma de pagamento.')               
      return;
    }
    if (!this.usuarioSrvc.usuarioAtual.usr_carrinho.enderecoEntrega) {
      this.showToastMessage('Informe um endereço de entrega.')
      return;      
    }
    this.gerarPedido().then((pedido:Pedido) => {
      this.navCtrl.setRoot('PedidoAcompanhamentoPage', pedido)
    });
  }

  gerarPedido() {
    this.pedido = this.usuarioSrvc.usuarioAtual.usr_carrinho;
    let usuario = new Usuario();
    if (this.usuarioSrvc.usuarioAtual.key) usuario.key =  this.usuarioSrvc.usuarioAtual.key;
    if (this.usuarioSrvc.usuarioAtual.usr_fb_id) usuario.usr_fb_id =  this.usuarioSrvc.usuarioAtual.usr_fb_id;
    if (this.usuarioSrvc.usuarioAtual.usr_fb_foto) usuario.usr_fb_foto =  this.usuarioSrvc.usuarioAtual.usr_fb_foto;
    if (this.usuarioSrvc.usuarioAtual.usr_nome) usuario.usr_nome = this.usuarioSrvc.usuarioAtual.usr_nome;
    if (this.usuarioSrvc.usuarioAtual.usr_email) usuario.usr_email =  this.usuarioSrvc.usuarioAtual.usr_email;
    this.pedido.usuario = usuario;
    this.pedido.historico = [];
    let currentDate = firebase.database.ServerValue.TIMESTAMP;
    this.pedido.historico.push(<PedidoHistorico>{
      status: 'Realizado',
      data: currentDate
    })    
    return this.pedidoSrvc.create(this.pedido);
  }

  showToastMessage(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }
}

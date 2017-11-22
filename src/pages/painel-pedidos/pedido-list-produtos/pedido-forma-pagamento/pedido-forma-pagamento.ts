import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../../../providers/database/models/pedido';
import { UsuarioService } from '../../../../providers/database/services/usuario';
import { DistribuidorService } from '../../../../providers/database/services/distribuidor';
import { Distribuidor } from '../../../../providers/database/models/distribuidor';
import { DistribuidorFormaPagamento } from '../../../../providers/database/models/distribuidor-forma-pagamento';
import { FormaPagamento } from '../../../../providers/database/models/forma-pagamento';
import { FormaPagamentoService } from '../../../../providers/database/services/forma-pagamento';
import { TipoPagamentoService } from '../../../../providers/database/services/tipo-pagamento';
import { TipoPagamento } from '../../../../providers/database/models/tipo-pagamento';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-pedido-forma-pagamento',
  templateUrl: 'pedido-forma-pagamento.html',
})
export class PedidoFormaPagamentoPage {
  carrinho: Pedido;
  formasPagamento: FormaPagamento[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    public distribuidorSrvc: DistribuidorService,
    public formaPagamentoSrvc: FormaPagamentoService,
    public tipoPagamentoSrvc: TipoPagamentoService,
    public alertCtrl: AlertController,
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
          this.formasPagamento.push( <FormaPagamento> {
            pag_mnemonico: formaPagamento.pag_mnemonico,
            pag_descricao: formaPagamento.pag_descricao,
            pag_img: formaPagamento.pag_img,
            pag_tipos: [],
            _selecionada: false
          })
          if (distFormaPagamento.pag_tipos) {
            distFormaPagamento.pag_tipos.forEach(TipoPagKey => {
              this.tipoPagamentoSrvc.get(distFormaPagamento.key, TipoPagKey).then((TipoPag: TipoPagamento) => {
                this.formasPagamento[this.formasPagamento.length -1].pag_tipos.push(<TipoPagamento> {
                  tipopag_mnemonico: TipoPag.tipopag_mnemonico,
                  tipopag_descricao: TipoPag.tipopag_descricao,
                  tipopag_img: TipoPag.tipopag_img,
                  _selecionado: false
                });
              })
            })
          }
        })
      })
    })
  }


}

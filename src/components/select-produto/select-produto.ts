import { PopoverController, ModalController } from 'ionic-angular';
import { ProdutoService } from './../../providers/database/services/produto';
import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';
import { Produto } from '../../providers/database/models/produto';

@Component({
  selector: 'select-produto',
  templateUrl: 'select-produto.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectProdutoComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectProdutoComponent), multi: true }
  ]
})
export class SelectProdutoComponent implements ControlValueAccessor, OnChanges {
  produto: Produto;
  constructor(
    private produtoSrvc: ProdutoService,
    private modalCtrl: ModalController
  ){
    this.produto = <Produto> {
      pro_img: null,
      pro_nome: 'Nome do Produto',
      pro_descricao: 'Selecione o produto'
    }
  }
  propagateChange: any = () => { };
  validateFn: any = () => { };

  @Input('keyProduto') _keyProduto = 0;

  get keyProduto() {
    return this._keyProduto;
  }

  set keyProduto(val) {
    this._keyProduto = val;
    console.log('funciona');
    this.produtoSrvc.get(val.toString()).take(1).subscribe((produto:Produto) => {
      this.produto = produto;
    })
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {

  }

  writeValue(value) {
    if (value) {
      this.keyProduto = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  select() {
    
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  selecionarProduto(event) {
    let popover = this.modalCtrl.create('CatalogoProdutosPage', { selecao: true });
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      if (data)
        if (data.produto) {
          this.writeValue(data.produto.$key)
        }
    })
  }
}

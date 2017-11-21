import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { TipoPagamento } from "../models/tipo-pagamento";

@Injectable()
export class TipoPagamentoService {
  public basePath:string;
  public tiposPagamento: FirebaseListObservable<TipoPagamento[]> = null; //  list of objects
  public tipoPagamento: FirebaseObjectObservable<TipoPagamento> = null; //   single object
  public formaPagamentoAtualKey;
  constructor(
    private db: AngularFireDatabase,
  ) {
  }
  getAll(key: string) {
    this.basePath = `/formas_pagamento/${key}/pag_tipos`;
    this.tiposPagamento = this.db.list(this.basePath);    
  }

  get(keyFormaPagamento, key:string): Promise<TipoPagamento> {
    return new Promise(resolve => {
      const path = `/formas_pagamento/${keyFormaPagamento}/pag_tipos/${key}`
      this.formaPagamentoAtualKey = keyFormaPagamento;
      this.db.object(path).take(1).subscribe((tipoPagamento: TipoPagamento) => {
        resolve(tipoPagamento);
      });
    })
  }  

  exists(field: string, value: string, key?): Promise<boolean> {
    return new Promise(resolve => {
      this.db.list(this.basePath, {
        query: {
          orderByChild: field,
          equalTo: value,
          limitToFirst: 1
        }
      }
      ).take(1).subscribe((res) => {
        if (res.length > 0) {
          if (key) {
            if (res[0].$key == key)
              resolve(false);
            else
              resolve(true);
          }
          else
            resolve(true);

        } else {
          resolve(false);
        }
      });
    })
  }


  getOnce(field: string, value: string) {
    return this.db.list(this.basePath, {
      query: {
        orderByChild: field,
        equalTo: value,
        limitToFirst: 1
      }
    }
    ).take(1);
  }

  create(TipoPagamento: TipoPagamento) {
    return this.tiposPagamento.push(TipoPagamento)
  }

  update(key: string, value: any) {
    return this.tiposPagamento.update(key, value);
  }

  delete(key: string) {
    return this.tiposPagamento.remove(key)
  }

  deleteAll(): void {
    this.tiposPagamento.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
import { FormaPagamento } from './../models/forma-pagamento';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class FormaPagamentoService {
  public basePath: string = '/formas_pagamento';
  public formasPagamento: FirebaseListObservable<FormaPagamento[]> = null; //  list of objects
  public formaPagamento: FirebaseObjectObservable<FormaPagamento> = null; //   single object

  constructor(
    private db: AngularFireDatabase,
  ) {
    this.formasPagamento = this.db.list(this.basePath);
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

  get(key): Promise<FormaPagamento> {
    return new Promise(resolve => {
      const path = `${this.basePath}/${key}`
      this.db.object(path).take(1).subscribe((formaPagamento: FormaPagamento) => {
        resolve(formaPagamento);
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

  create(FormaPagamento: FormaPagamento) {
    return this.formasPagamento.push(FormaPagamento)
  }

  update(key: string, value: any) {
    return this.formasPagamento.update(key, value);
  }

  delete(key: string) {
    return this.formasPagamento.remove(key);
  }

  deleteAll(): void {
    this.formasPagamento.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
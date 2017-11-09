import { ProdutoService } from './produto';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Produto } from "../models/produto";

@Injectable()
export class DistribuidorProdutoService {
  private basePath: string;
  public distribuidorProdutos;
  public produtos;

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private produtoSrvc: ProdutoService
  ) {
  }

  getAll(key: string) {
    this.basePath = `/distribuidores/${key}/dist_produtos`;
    this.distribuidorProdutos = this.db.list(this.basePath);
    this.distribuidorProdutos.subscribe((itens) => {
      this.produtos = itens.map(produto => {
        return this.db.object(this.produtoSrvc.basePath + `/${produto.$key}`);
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

  create(key: string) {
    const path = `${this.basePath}/${key}`
    return this.db.object(path).set(true);
  }


  delete(key: string) {
    return this.distribuidorProdutos.remove(key);
  }

  deleteAll() {
    return this.distribuidorProdutos.remove();
  }

  private handleError(error) {
    console.log(error)
  }
}
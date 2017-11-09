import { ProdutoService } from './produto';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Produto } from "../models/produto";
import { DistribuidorProduto } from '../models/distribuidor-produto';
import { DistribuidorCategoriaService } from './distribuidor-categoria';
import { DistribuidorCategoria } from '../models/distribuidor-categoria';

@Injectable()
export class DistribuidorProdutoService {
  private basePath: string;
  public distribuidorProdutos: DistribuidorProduto[] = null; ;

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private produtoSrvc: ProdutoService,
    private distribuidorCategoriaSrvc: DistribuidorCategoriaService,
  ) {
  }

  getAll(key: string) {
    this.basePath = `/distribuidores/${key}/dist_produtos`;
    this.db.list(this.basePath, {query: {
      orderByChild: 'dist_categoria'
    }}).subscribe((distribuidorProdutos) => {
      this.distribuidorProdutos = distribuidorProdutos;
      this.distribuidorProdutos.map(distribuidorProduto => {
        this.db.object(this.produtoSrvc.basePath + `/${distribuidorProduto.dist_produto}`).take(1).subscribe((produto: Produto) => {
          distribuidorProduto.produto = produto;
        })
        this.db.object(this.distribuidorCategoriaSrvc.basePath + `/${distribuidorProduto.dist_categoria}`).take(1).subscribe((categoria: DistribuidorCategoria) => {
          distribuidorProduto.categoria = categoria;
        })
        
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

  create(distribuidorProduto: DistribuidorProduto) {
    return this.db.list(this.basePath).push(distribuidorProduto)
  }


  update(key: string, value: any) {
    return this.db.list(this.basePath).update(key, value);
  }

  delete(key: string) {
    return this.db.list(this.basePath).remove(key);
  }

  deleteAll() {
    return this.db.list(this.basePath).remove();
  }

  private handleError(error) {
    console.log(error)
  }
}
import { Produto } from './../models/produto';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class ProdutoService {
  private basePath: string = '/produtos';
  public produtos: FirebaseListObservable<Produto[]> = null; //  list of objects
  public produto: FirebaseObjectObservable<Produto> = null; //   single object
  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    this.produtos = this.db.list(this.basePath);
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
  getList(query = {}): FirebaseListObservable<Produto[]> {
    this.produtos = this.db.list(this.basePath, { query: query });
    return this.produtos;
  }

  get(key: string): FirebaseObjectObservable<Produto> {
    const itemPath = `${this.basePath}/${key}`;
    this.produto = this.db.object(itemPath)
    return this.produto
  }

  getOnce(field: string, value: string) {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
  }

  create(Produto: Produto) {
    return this.produtos.push(Produto)
  }

  update(key: string, value: any) {
    return this.produtos.update(key, value);
  }

  delete(key: string): void {
    this.produtos.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.produtos.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
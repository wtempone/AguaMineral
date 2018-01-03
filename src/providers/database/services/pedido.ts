import { Pedido } from './../models/pedido';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class PedidoService {
  public basePath: string = '/pedidos';
  public pedidos: FirebaseListObservable<Pedido[]> = null; //  list of objects
  public pedido: FirebaseObjectObservable<Pedido> = null; //   single object
  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    this.pedidos = this.db.list(this.basePath);
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
  getList(query = {}): FirebaseListObservable<Pedido[]> {
    this.pedidos = this.db.list(this.basePath, { query: query });
    return this.pedidos;
  }

  get(key: string): FirebaseObjectObservable<Pedido> {
    const itemPath = `${this.basePath}/${key}`;
    this.pedido = this.db.object(itemPath)
    return this.pedido
  }

  getOnce(field: string, value: string) {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
  }

  create(Pedido: Pedido) {
    return this.pedidos.push(Pedido)
  }

  update(key: string, value: any) {
    return this.pedidos.update(key, value);
  }

  delete(key: string) {
    return this.pedidos.remove(key);
  }

  deleteAll(): void {
    this.pedidos.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
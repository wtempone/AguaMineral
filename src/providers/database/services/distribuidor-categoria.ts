import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { DistribuidorCategoria } from "../models/distribuidor-categoria";

@Injectable()
export class DistribuidorCategoriaService {
  public basePath: string;
  public distribuidorCategorias: FirebaseListObservable<DistribuidorCategoria[]> = null; ;

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
  ) {
  }

  getAll(key: string) {
    this.basePath = `/distribuidores/${key}/dist_categorias`;
    this.distribuidorCategorias = this.db.list(this.basePath);
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

  create(categoria: DistribuidorCategoria) {
    return this.distribuidorCategorias.push(categoria)
  }


  update(key: string, value: any) {
    return this.distribuidorCategorias.update(key, value);
  }

  delete(key: string) {
    return this.distribuidorCategorias.remove(key);
  }

  deleteAll() {
    return this.distribuidorCategorias.remove();
  }

  private handleError(error) {
    console.log(error)
  }
}
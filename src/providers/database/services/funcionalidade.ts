import { Funcionalidade } from './../models/funcionalidade';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class FuncionalidadeService {
  private basePath: string = '/funcionalidades';
  public funcionalidades: FirebaseListObservable<Funcionalidade[]> = null; //  list of objects
  public funcionalidade: FirebaseObjectObservable<Funcionalidade> = null; //   single object

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
  ) {
    this.funcionalidades = this.db.list(this.basePath);
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

  get(key): Promise<Funcionalidade> {
    return new Promise(resolve => {
      const path = `${this.basePath}/${key}`
      this.db.object(path).take(1).subscribe((funcionalidade: Funcionalidade) => {
        resolve(funcionalidade);
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

  create(Funcionalidade: Funcionalidade) {
    return this.funcionalidades.push(Funcionalidade)
  }

  update(key: string, value: any) {
    return this.funcionalidades.update(key, value);
  }

  delete(key: string) {
    return this.funcionalidades.remove(key);
  }

  deleteAll(): void {
    this.funcionalidades.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
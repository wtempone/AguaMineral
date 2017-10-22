import { FuncionalidadeService } from './funcionalidade';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Funcionalidade } from "../models/funcionalidade";

@Injectable()
export class PerfilFuncionalidadeService {
  private basePath: string;
  public perfilFuncionalidades: FirebaseListObservable<any[]> = null; //  list of objects
  public funcionalidades: Funcionalidade[] = null; //  list of objects

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private funcionalidadeSrvc: FuncionalidadeService
  ) {
  }

  get(key: string) {
    this.basePath = `/perfis/${key}/funcionalidades`;
    this.perfilFuncionalidades = this.db.list(this.basePath);
    this.perfilFuncionalidades.subscribe((itens) => {
      this.funcionalidades = []
      itens.forEach(item => {
        this.funcionalidadeSrvc.get(item.$key).then((funcionalidade: Funcionalidade) => {
          if (funcionalidade) {
            this.funcionalidades.push(funcionalidade)
          }
        })
      })
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
    return this.perfilFuncionalidades.remove(key);
  }

  deleteAll() {
    return this.perfilFuncionalidades.remove();
  }

  private handleError(error) {
    console.log(error)
  }
}
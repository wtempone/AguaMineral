
import { AcaoService } from './acao';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Acao } from "../models/acao";

@Injectable()
export class PerfilFuncionalidadeAcaoService {
  private basePath: string;
  public perfilFuncionalidadeAcoes: FirebaseListObservable<any[]> = null; //  list of objects
  public acoes

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private acaoSrvc: AcaoService
  ) {
  }

  getAll(keyPerfil: string, keyFuncionalidades: string) {
    this.basePath = `/perfis/${keyPerfil}/per_funcionalidades/${keyFuncionalidades}/fun_acoes`;
    console.log(`basepath:${this.basePath}`)
    this.perfilFuncionalidadeAcoes = this.db.list(this.basePath);
    this.perfilFuncionalidadeAcoes.subscribe((itens) => {
      this.acoes = itens.map(acao => {
        return this.db.object( `/funcionalidades/${keyFuncionalidades}/fun_acoes/${acao.$key}`);
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
    console.log(`path create:${path}`)

    return this.db.object(path).set(true);
  }


  delete(key: string) {
    return this.perfilFuncionalidadeAcoes.remove(key);
  }

  deleteAll() {
    return this.perfilFuncionalidadeAcoes.remove();
  }

  private handleError(error) {
    console.log(error)
  }
}
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Acao } from "../models/acao";

@Injectable()
export class AcaoService {
  public basePath:string;
  public acoes: FirebaseListObservable<Acao[]> = null; //  list of objects
  public acao: FirebaseObjectObservable<Acao> = null; //   single object
  public funcionalidadeAtualKey;
  constructor(
    private db: AngularFireDatabase,
  ) {
  }
  getAll(key: string) {
    this.basePath = `/funcionalidades/${key}/fun_acoes`;
    this.acoes = this.db.list(this.basePath);    
  }

  get(keyFuncionalidade, key:string): Promise<Acao> {
    return new Promise(resolve => {
      const path = `/funcionalidades/${keyFuncionalidade}/fun_acoes/${key}`
      this.funcionalidadeAtualKey = keyFuncionalidade;
      this.db.object(path).take(1).subscribe((acao: Acao) => {
        resolve(acao);
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

  create(Acao: Acao) {
    return this.acoes.push(Acao)
  }

  update(key: string, value: any) {
    return this.acoes.update(key, value);
  }

  delete(key: string) {
    return this.acoes.remove(key)
  }

  deleteAll(): void {
    this.acoes.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
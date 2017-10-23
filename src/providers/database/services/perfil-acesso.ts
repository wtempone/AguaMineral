import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { PerfilAcesso } from "../models/perfil-acesso";

@Injectable()
export class PerfilAcessoService {
  private basePath: string = '/perfis';
  public perfisAcesso: FirebaseListObservable<PerfilAcesso[]> = null; //  list of objects
  public perfilAcesso: FirebaseObjectObservable<PerfilAcesso> = null; //   single object

  PERFIL_UsuarioPadrao = 'USR';
  PERFIL_AdministradorSistema = 'ADM_SYS';
  
  constructor(
    private db: AngularFireDatabase,
  ) {
    this.perfisAcesso = this.db.list(this.basePath);
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

  getByMnemonico(mnemonico: string):Promise<PerfilAcesso> {
    return new Promise(resolve => {
     this.db.object(this.basePath).$ref.orderByChild('per_mnemonico').equalTo(mnemonico).limitToFirst(1).once('value').then((res)=>{
       let perilAcesso: PerfilAcesso = res.val();
       resolve(perilAcesso);
     });
    })
  }
  getByKey(key: string): FirebaseObjectObservable<PerfilAcesso>  {
    const path = `${this.basePath}/${key}`
    return this.db.object(path)
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

  create(PerfilAcesso: PerfilAcesso) {
    return this.perfisAcesso.push(PerfilAcesso)
  }

  update(key: string, value: any) {
    return this.perfisAcesso.update(key, value);
  }

  delete(key: string) {
    return this.perfisAcesso.remove(key);
  }

  deleteAll(): void {
    this.perfisAcesso.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
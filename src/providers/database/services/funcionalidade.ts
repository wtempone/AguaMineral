import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Funcionalidade } from "../models/funcionalidade";

@Injectable()
export class FuncionalidadeService {
  private basePath: string;
  public funcionalidades: FirebaseListObservable<Funcionalidade[]> = null; //  list of objects
  public funcionalidade: FirebaseObjectObservable<Funcionalidade> = null; //   single object

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
  ) {
  }
  get(key: string) {
    this.basePath = `/perfis/${key}/funcionalidades/`;
    this.funcionalidades = this.db.list(this.basePath);    
  }
  getPerfil(mnemonico: string):Promise<Funcionalidade> {
    return new Promise(resolve => {
     this.db.list(this.basePath).$ref.orderByChild('per_mnemonico').equalTo(mnemonico).limitToFirst(1).once('value').then((res)=>{
       resolve(<Funcionalidade>res.val()[0]);
     });
    })
  }

  getOnce(field: string, value: string) {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
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
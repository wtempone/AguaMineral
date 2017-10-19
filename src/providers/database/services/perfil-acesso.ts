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
    private usuarioSrvc: UsuarioService,
  ) {
    this.perfisAcesso = this.db.list(this.basePath);
  }

  getPerfil(mnemonico: string):Promise<PerfilAcesso> {
    return new Promise(resolve => {
     this.db.list(this.basePath).$ref.orderByChild('per_mnemonico').equalTo(mnemonico).limitToFirst(1).once('value').then((res)=>{
       resolve(<PerfilAcesso>res.val()[0]);
     });
    })
  }

  getOnce(field: string, value: string) {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
  }

  create(PerfilAcesso: PerfilAcesso) {
    return this.perfisAcesso.push(PerfilAcesso)
  }

  update(key: string, value: any) {
    return this.perfisAcesso.update(key, value);
  }

  delete(key: string): void {
    this.perfisAcesso.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.perfisAcesso.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
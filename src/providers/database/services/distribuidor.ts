import { PerfilAcesso } from './../models/perfil-acesso';
import { PerfilAcessoService } from './perfil-acesso';
import { Distribuidor } from './../models/distribuidor';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class DistribuidorService {
  private basePath: string = '/distribuidores';
  public distribuidores: FirebaseListObservable<Distribuidor[]> = null; //  list of objects
  public distribuidor: FirebaseObjectObservable<Distribuidor> = null; //   single object
  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private perfilAcessoSrvc: PerfilAcessoService
  ) {
    this.distribuidores = this.db.list(this.basePath);
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

  getList(query = {}): FirebaseListObservable<Distribuidor[]> {
    this.distribuidores = this.db.list(this.basePath, { query: query });
    return this.distribuidores;
  }

  get(key: string): FirebaseObjectObservable<Distribuidor> {
    const itemPath = `${this.basePath}/${key}`;
    this.distribuidor = this.db.object(itemPath)
    return this.distribuidor
  }

  getOnce(field: string, value: string) {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
  }

  create(distribuidor: Distribuidor) {
    return new Promise(resolve => {
      this.distribuidores.push(distribuidor).then((distribuidorCriado) => {
        this.perfilAcessoSrvc.getByChild('per_ativo', true).subscribe((perfis: PerfilAcesso[]) => {
          if (perfis.filter(x => x.per_distribuidor == true && x.per_padrao == true).length > 0) {
            perfis.filter(x => x.per_distribuidor == true && x.per_padrao == true).forEach((perfilPadrao: PerfilAcesso) => {
              this.addPerfil(distribuidorCriado.key, perfilPadrao.$key)
            })
            this.addFuncionario(distribuidorCriado.key,this.usuarioSrvc.usuarioAtual.$key);
            resolve(distribuidorCriado.key)
          } else {
            this.addFuncionario(distribuidorCriado.key,this.usuarioSrvc.usuarioAtual.$key);            
            resolve(distribuidorCriado.key)
          }
        })
      });
    })
  }


  addPerfil(key: string, keyPerfil: string) {
    const path = `${this.basePath}/${key}/dist_perfis/${keyPerfil}`
    return this.db.object(path).set(true);
  }

  addFuncionario(key: string, keyUsuario: string) {
    const path = `${this.basePath}/${key}/dist_funcionarios/${keyUsuario}`
    return this.db.object(path).set(true);
  }

  update(key: string, value: any) {
    return this.distribuidores.update(key, value);
  }

  delete(key: string): void {
    this.distribuidores.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.distribuidores.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
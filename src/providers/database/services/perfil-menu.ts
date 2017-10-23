import { MenuAcesso } from './../models/menu-acesso';
import { MenuService } from './menu';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class PerfilMenuService {
  private basePath: string;
  public perfilMenus: FirebaseListObservable<any[]> = null; //  list of objects
  public menus: MenuAcesso[] = null; //  list of objects

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
    private menuSrvc: MenuService
  ) {
  }

  get(key: string) {
    this.basePath = `/perfis/${key}/per_menus`;
    this.perfilMenus = this.db.list(this.basePath);
    this.perfilMenus.subscribe((itens) => {
      this.menus = []
      itens.forEach(item => {
        this.menuSrvc.get(item.$key).then((menu: MenuAcesso) => {
          if (menu) {
            this.menus.push(menu)
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
    return this.perfilMenus.remove(key);
  }

  deleteAll() {
    return this.perfilMenus.remove();
  }

  private handleError(error) {
    console.log(error)
  }
}
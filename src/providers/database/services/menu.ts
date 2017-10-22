import { MenuAcesso } from './../models/menu-acesso';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class MenuService {
  private basePath: string = '/menus';
  public menus: FirebaseListObservable<MenuAcesso[]> = null; //  list of objects
  public menu: FirebaseObjectObservable<MenuAcesso> = null; //   single object

  constructor(
    private db: AngularFireDatabase,
    private usuarioSrvc: UsuarioService,
  ) {
    this.menus = this.db.list(this.basePath);    
  }
  get(key): Promise<MenuAcesso> {
    return new Promise(resolve => {
      const path = `${this.basePath}/${key}`
      this.db.object(path).take(1).subscribe((menu: MenuAcesso) => {
        resolve(menu);
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

  create(Menu: MenuAcesso) {
    return this.menus.push(Menu)
  }

  update(key: string, value: any) {
    return this.menus.update(key, value);
  }

  delete(key: string) {
    return this.menus.remove(key);
  }

  deleteAll(): void {
    this.menus.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
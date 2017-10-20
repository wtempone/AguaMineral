import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { Usuario } from '../database-providers';
import { MenuAcesso, PerfilAcesso } from "../models/perfil-acesso";
import { PerfilAcessoService } from './perfil-acesso';

@Injectable()
export class UsuarioService {
  private basePath: string = '/usuarios';
  public usuarios: FirebaseListObservable<Usuario[]> = null; //  list of objects
  public usuario: FirebaseObjectObservable<Usuario> = null; //   single object
  public usuarioAtual: Usuario;  
  constructor(
    private db: AngularFireDatabase,
  ) {
    this.usuarios = this.db.list(this.basePath);
  }

  loadUsuarioAtualByEmail(email) {
    return this.getOnce('usr_email', email).subscribe((res) => {
      if (res.length > 0) {
        let usuario: Usuario = res[0];
        this.usuarioAtual = usuario;
      }
    })
  }

  getList(query = {}): FirebaseListObservable<Usuario[]> {
    this.usuarios = this.db.list(this.basePath, { query: query });
    return this.usuarios;
  }

  get(key: string): FirebaseObjectObservable<Usuario> {
    const itemPath = `${this.basePath}/${key}`;
    this.usuario = this.db.object(itemPath)
    return this.usuario
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

  create(usuario: Usuario) {
    this.updateMenu(usuario)
    return this.usuarios.push(usuario);
  }


  update(key: string, value: any) {
    this.updateMenu(value);
    return this.usuarios.update(key, value);
  }

  updateMenu(usuario: Usuario) {
    let menus: MenuAcesso[] = [];
    usuario.usr_perfis.forEach((perfil) => {
      perfil.per_menu.forEach((menu) => {
        if (menus.filter(x => x.mnu_page == menu.mnu_page).length == 0) {
          menus.push(menu);
        }
      })
    })
    usuario.usr_menus = menus;
  }

  delete(key: string): void {
    this.usuarios.remove(key)
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
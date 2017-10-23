import { MenuAcesso } from './../models/menu-acesso';
import { MenuService } from './menu';
import { Usuario } from './../models/usuario';
import { PerfilAcesso } from './../models/perfil-acesso';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Storage } from '@ionic/storage';

import { PerfilAcessoService } from './perfil-acesso';
import { FuncionalidadeService } from './funcionalidade';
import { AcaoService } from './acao';
import { Funcionalidade } from '../models/funcionalidade';
import { Acao } from '../models/acao';

@Injectable()
export class UsuarioService {
  private basePath: string = '/usuarios';
  public usuarios: FirebaseListObservable<Usuario[]> = null; //  list of objects
  public usuario: FirebaseObjectObservable<Usuario> = null; //   single object
  public usuarioAtual: Usuario;
  constructor(
    private db: AngularFireDatabase,
    private perfilAcessoSrvc: PerfilAcessoService,
    private menuSrvc: MenuService,
    private funcionalidadeSrvc: FuncionalidadeService,
    private acaoSrvc: AcaoService,
    private storage: Storage
  ) {
    this.usuarios = this.db.list(this.basePath);
  }

  loadPerfisAcesso(key) {
    this.get(key).take(1).subscribe((usuario: Usuario) => {
      this.usuarioAtual = usuario;
      this.storage.set("_keyUsuarioAtual", this.usuarioAtual.$key)

      this.db.list(`${this.basePath}/${this.usuarioAtual.$key}/usr_perfis`).subscribe((perfis) => {
        this.usuarioAtual.usr_menus = [];
        this.usuarioAtual.usr_funcionalidades = [];
        perfis.forEach((perfil) => {
          this.perfilAcessoSrvc.getByKey(perfil.$key).take(1).subscribe((perfilAcesso: PerfilAcesso) => {
            //Carrega menus
            Object.keys(perfilAcesso.per_menus).forEach((menuKey: string) => {
              this.menuSrvc.get(menuKey).then((menu: MenuAcesso) => {
                if (this.usuarioAtual.usr_menus.filter(x => x.mnu_page == menu.mnu_page).length == 0) {
                  this.usuarioAtual.usr_menus.push(menu);
                }
              })
            })
            //Carrega funcionalidades            
            Object.keys(perfilAcesso.per_funcionalidades).forEach((funcionalidadeKey: string) => {              
              this.funcionalidadeSrvc.get(funcionalidadeKey).then((funcionalidade: Funcionalidade) => {
                let indFuncionalidade = 0;
                if (this.usuarioAtual.usr_funcionalidades.filter(x => x.fun_mnemonico == funcionalidade.fun_mnemonico).length == 0) {
                  this.usuarioAtual.usr_funcionalidades.push(<Funcionalidade>{
                    fun_mnemonico: funcionalidade.fun_mnemonico,
                    fun_nome: funcionalidade.fun_nome
                  });
                  indFuncionalidade = this.usuarioAtual.usr_funcionalidades.length - 1;
                  this.usuarioAtual.usr_funcionalidades[indFuncionalidade].fun_acoes = []   
                } else {
                  indFuncionalidade = this.usuarioAtual.usr_funcionalidades.findIndex(x => x.fun_mnemonico == funcionalidade.fun_mnemonico)
                }
                //Carrega funcionalidades
                Object.keys(funcionalidade.fun_acoes).forEach((acaoKey: string) => {
                  this.acaoSrvc.get(funcionalidadeKey,acaoKey).then((acao: Acao) => {
                    if (this.usuarioAtual.usr_funcionalidades[indFuncionalidade].fun_acoes.filter(x => x.aca_mnemonico == acao.aca_mnemonico).length == 0) {
                      this.usuarioAtual.usr_funcionalidades[indFuncionalidade].fun_acoes.push(<Acao>{
                        aca_mnemonico: acao.aca_mnemonico,
                        aca_nome: acao.aca_nome
                      })
                    }
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  loadUsuarioAtualByEmail(email) {
    return this.getOnce('usr_email', email).subscribe((res) => {
      if (res.length > 0) {
        let usuario: Usuario = res[0];
        this.usuarioAtual = usuario;
      }
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
    //this.updateMenu(usuario)
    return new Promise(resolve => {
      this.usuarios.push(usuario).then((usuarioCriado) => {
        this.addPerfil(usuarioCriado.key, 'USR')
        resolve(usuarioCriado.key)
      });
    })
  }


  update(key: string, value: any) {
    //this.updateMenu(value);
    return new Promise(resolve => {
      this.usuarios.update(key, value).then(usuarioAlterado => {
        resolve(key);
      });
    });
  }

  addPerfil(key: string, mnemonico: string) {
    return this.perfilAcessoSrvc.getByMnemonico(this.perfilAcessoSrvc.PERFIL_UsuarioPadrao).then((perfil: PerfilAcesso) => {
      const path = `${this.basePath}/${key}/usr_perfis/${Object.keys(perfil)[0]}`
      return this.db.object(path).set(true);
    })
  }

  delete(key: string): void {
    this.usuarios.remove(key)
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
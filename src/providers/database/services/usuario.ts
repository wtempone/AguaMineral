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
  public basePath: string = '/usuarios';
  public usuarios: FirebaseListObservable<Usuario[]> = null; //  list of objects
  public usuario: FirebaseObjectObservable<Usuario> = null; //   single object
  public usuarioAtual: Usuario;
  public perfis
  constructor(
    private db: AngularFireDatabase,
    private perfilAcessoSrvc: PerfilAcessoService,
    private menuSrvc: MenuService,
    private funcionalidadeSrvc: FuncionalidadeService,
    private acaoSrvc: AcaoService,
    private storage: Storage
  ) {
    this.usuarios = this.db.list(this.basePath);
    this.storage.get("_keyUsuarioAtual").then((key: string) => {
      if (key) {
        this.loadPerfisAcesso(key);
      }
    });
  }


  loadPerfisAcesso(key) {
    return new Promise(resolve => {
      this.get(key).subscribe((usuario: Usuario) => {
        usuario.usr_menus = []
        usuario.usr_funcionalidades = []
        this.storage.set("_keyUsuarioAtual", usuario.$key)
        this.db.list(this.perfilAcessoSrvc.basePath).subscribe((perfis: PerfilAcesso[]) => {
          this.db.list(this.menuSrvc.basePath).subscribe((menus: MenuAcesso[]) => {
            this.db.list(this.funcionalidadeSrvc.basePath).subscribe((funcionalidades: Funcionalidade[]) => {
              if (usuario.usr_perfis) {
                var usr_perfis = (<any>Object).entries(usuario.usr_perfis);
                if (usr_perfis) {
                  usr_perfis.forEach(([key, value]) => {
                    var usr_perfil = perfis.filter(x => x.$key == key)[0];
                    if (usr_perfil) {
                      //Obtem funcionalidades e acoes do usuario pelo perfil                
                      if (usr_perfil.per_menus) {
                        var per_menus = (<any>Object).entries(usr_perfil.per_menus);
                        if (per_menus) {
                          per_menus.forEach(([keyFuncionlidade, valueFuncionalidade]) => {
                            var menu = menus.filter(x => x.$key == keyFuncionlidade)[0];
                            if (menu) {
                              if (usuario.usr_menus.filter(x => x.$key == menu.$key).length == 0) {
                                usuario.usr_menus.push(<MenuAcesso>{
                                  $key: menu.$key,
                                  mnu_icone: menu.mnu_icone,
                                  mnu_nome: menu.mnu_nome,
                                  mnu_descricao: menu.mnu_descricao,
                                  mnu_page: menu.mnu_page,
                                })
                              }
                            }

                          })
                        }

                      }

                      //Obtem funcionalidades e acoes do usuario pelo perfil                
                      if (usr_perfil.per_funcionalidades) {
                        var per_funcionalidades = (<any>Object).entries(usr_perfil.per_funcionalidades);
                        if (per_funcionalidades) {
                          per_funcionalidades.forEach(([keyFuncionlidade, valueFuncionalidade]) => {
                            var funcionalidade = funcionalidades.filter(x => x.$key == keyFuncionlidade)[0];
                            if (funcionalidade) {
                              if (usuario.usr_funcionalidades.filter(x => x.$key == funcionalidade.$key).length == 0) {
                                usuario.usr_funcionalidades.push(<Funcionalidade>{
                                  $key: funcionalidade.$key,
                                  fun_mnemonico: funcionalidade.fun_mnemonico,
                                  fun_nome: funcionalidade.fun_nome,
                                  fun_acoes: []
                                })
                              }
                            }


                            //obtem acoes 
                            if (valueFuncionalidade.fun_acoes) {
                              var fun_acoes = (<any>Object).entries(valueFuncionalidade.fun_acoes);
                              if (fun_acoes) {
                                fun_acoes.forEach(([keyAcao, valueAcao]) => {
                                  if (funcionalidade.fun_acoes) {
                                    var acoes = (<any>Object).entries(funcionalidade.fun_acoes);
                                    var acao = acoes.filter(([key, value]) => key == keyAcao)[0];
                                    if (acao) {
                                      if (usuario.usr_funcionalidades.filter(x => x.$key == funcionalidade.$key)[0]
                                        .fun_acoes.filter(x => x.$key == acao.$key).length == 0) {
  
                                        usuario.usr_funcionalidades.filter(x => x.$key == funcionalidade.$key)[0].fun_acoes.push(acao);
  
                                      }
                                    }
                                  }
                                })
                              }

                            }
                          })
                        }

                      }
                    }

                  })
                }

                this.usuarioAtual = usuario;
                resolve(this.usuarioAtual);
              }
            })
          })
        })
      })
    })
  }

  valida(mnemonico: string, acesso: string): boolean {
    let temAcesso: boolean = false;
    if (!this.usuarioAtual) {
      temAcesso = false;
    } else {
      temAcesso = this.verificaAcesso(mnemonico, acesso);
    }
    return temAcesso;
  }

  verificaAcesso(mnemonico: string, acesso: string): boolean {
    let temAcesso: boolean = false;
    var funcionalidade = this.usuarioAtual.usr_funcionalidades.filter(x => x.fun_mnemonico.toUpperCase() == mnemonico.toUpperCase())[0];
    if (funcionalidade) {
      let acessos = (<any>Object).entries(funcionalidade.fun_acoes).filter(
        ([key, value]) => (<any>Object).entries(value).filter(
          ([key, value]) => value.aca_mnemonico == acesso
        ).length > 0);
      if (acessos.length > 0) {
        temAcesso = true;
      }
    }
    //console.log(`Acesso ${temAcesso ? 'permitido' : 'negado   '} -> Funcionalidade: ${mnemonico} - Acao: ${acesso}`)    
    return temAcesso;
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

  excluirPerfil(usuarioKey:string, keyPerfil: string){
    const path = `${this.basePath}/${usuarioKey}/usr_perfis/${keyPerfil}`
    return this.db.object(path).remove();
  }

  adicionarPerfil(usuarioKey:string, keyPerfil: string){
    const path = `${this.basePath}/${usuarioKey}/usr_perfis/${keyPerfil}`
    return this.db.object(path).set(true);
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
        this.perfilAcessoSrvc.getByChild('per_ativo',true).subscribe((perfis:PerfilAcesso[]) => {
          if (perfis.filter(x => x.per_distribuidor == false && x.per_padrao == true).length > 0) {
            perfis.filter(x => x.per_distribuidor == false && x.per_padrao == true).forEach((perfilPadrao: PerfilAcesso) => {
              this.addPerfil(usuarioCriado.key, perfilPadrao.per_mnemonico)
            })
            resolve(usuarioCriado.key)            
          } else {
            resolve(usuarioCriado.key)            
          }
        })
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
    return this.perfilAcessoSrvc.getByMnemonico(mnemonico).then((perfil: PerfilAcesso) => {
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
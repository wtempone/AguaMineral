import { User } from './user/user';
import { PerfilAcessoService } from './database/services/perfil-acesso';
import { Usuario } from './database/models/usuario';
import { UsuarioService } from './database/services/usuario';
//import { User } from './database/models/user';
import { Platform, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { PerfilAcesso } from './database/models/perfil-acesso';

@Injectable()
export class AuthServiceProvider {
  facebookCredential: any = null;
  facebookUser: any = null;

  constructor(
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private facebook: Facebook,
    private toastController: ToastController,
    private http: Http,
    public usuarioSrvc: UsuarioService,
    public perfilAcessoSrvc: PerfilAcessoService,
    public storage: Storage
  ) {
  }

  signInWithFacebook(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        this.facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.setUserFacebook();
        //return this.afAuth.auth.signInWithCredential(this.facebookCredential);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res => {
        this.facebookCredential = res.credential;
        this.facebookUser = res.additionalUserInfo;
        return this.setUserFacebook();
      }));
    }
  }

  setUserFacebook() {
    return new Promise(resolve => {
      this.getMe().then((facebookUser: any) => {
        this.usuarioSrvc.getOnce('usr_fb_id', facebookUser.id).subscribe((res) => {
          if (res.length > 0) {
            let usuario: Usuario = res[0];
            let key = res[0].$key;
            usuario.usr_email = facebookUser.email;
            usuario.usr_nome = facebookUser.name;
            usuario.usr_fb_foto = facebookUser.picture;
            usuario.usr_data = new Date(Date.now());
            this.usuarioSrvc.update(key, usuario).then((key) => {
              this.usuarioSrvc.usuarioAtual = usuario;
              this.usuarioSrvc.loadPerfisAcesso(key)
              resolve();
            })
          } else {

            let usuario = <Usuario>{
              usr_email: facebookUser.email,
              usr_nome: facebookUser.name,
              usr_fb_id: facebookUser.id,
              usr_data: new Date(Date.now()),
              usr_fb_foto: facebookUser.picture
            }
            this.usuarioSrvc.create(usuario).then((key) => {
              this.usuarioSrvc.loadPerfisAcesso(key)
              resolve();
            })
          }

        })
      })
    });
  }

  signInWithEmail(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      return this.usuarioSrvc.getOnce('usr_email', email).subscribe((res) => {
        if (res.length > 0) {
          let usuario: Usuario = res[0];
          this.usuarioSrvc.usuarioAtual = usuario;
        }
      });
    });
  }

  registerWithEmail(nome: string, email: string, password: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      return this.setUserEmail(nome, email);
    });
  }

  setUserEmail(nome: string, email: string) {
    return new Promise(resolve => {
      this.usuarioSrvc.getOnce('usr_email', email).subscribe((res) => {
        if (res.length == 0) {
          let usuario = <Usuario>{
            usr_email: email,
            usr_nome: nome,
            usr_data: new Date(Date.now())
          }
          this.usuarioSrvc.create(usuario).then((key) => {
            this.usuarioSrvc.loadPerfisAcesso(key)
            resolve();
          });
        }
      });
    })
  }

  resetPassword(email: string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    return this.afAuth.auth.signOut();
  }

  public getMe() {
    return this.callFacebookApi("me?fields=picture,email,id,name");
  }

  public getFriends() {
    return this.callFacebookApi('me/friends');
  }

  public callFacebookApi(path: string) {
    return new Promise(resolve => {
      this.http.get('https://graph.facebook.com/v2.9/' + path +
        (path.indexOf('?') > 0 ? '&' : '?') + 'access_token=' +
        this.facebookCredential.accessToken)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          this.presentToast(`Erro no acesso a Api Grafica do Facebook
          :` + JSON.stringify(error));
        })
    });
  }

  public presentToast(message: string) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.usuarioSrvc.usuarioAtual = null;
      this.storage.clear();
    });
  }

}

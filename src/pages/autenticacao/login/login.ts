import { UsuarioService } from './../../../providers/database/services/usuario';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController, ModalController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../../providers/auth-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  messages: string;

  constructor(public navCtrl: NavController,
    private authService: AuthServiceProvider,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    public usuarioSrvc: UsuarioService,
    public viewCtrl: ViewController
  ) {
    console.log(this.navParams.data.message);
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
  register() {
    this.navCtrl.pop();
    this.modalCtrl.create('SignupPage').present();
  }

  resetPwd() {
    this.navCtrl.pop();    
    this.modalCtrl.create('ResetpwdPage').present();
  }

  facebookLogin() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present(); this.authService.signInWithFacebook().then(() => {
      this.viewCtrl.dismiss().then(() => {
        this.loading.dismiss();
      });
    });

  }
  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authService.signInWithEmail(this.loginForm.value.email, this.loginForm.value.password).then(authService => {
        this.viewCtrl.dismiss().then(() => {
          this.loading.dismiss();
        })
      }, error => {
        this.loading.dismiss().then(() => {
          var messageErrorTranslated: string;
          this.translate.get([
            "AUTH_INVALID_EMAIL", "AUTH_USER_DISABLED", "AUTH_USER_NOT_FOUND", "AUTH_WRONG_PASSWORD"
          ]).subscribe(
            (values) => {
              switch (error.code) {
                case 'auth/invalid-email':
                  messageErrorTranslated = values.AUTH_INVALID_EMAIL;
                  break;
                case 'auth/user-disabled':
                  messageErrorTranslated = values.AUTH_USER_DISABLED;
                  break;
                case 'auth/user-not-found':
                  messageErrorTranslated = values.AUTH_USER_NOT_FOUND;
                  break;
                case 'auth/wrong-password':
                  messageErrorTranslated = values.AUTH_WRONG_PASSWORD;
                  break;
              }
              // let alert = this.alertCtrl.create({
              //   message: messageErrorTranslated,
              //   buttons: [
              //     {
              //       text: "Ok",
              //       role: 'cancel'
              //     }
              //   ]
              // });
              // alert.present();
              let toast = this.toastCtrl.create({
                message: messageErrorTranslated,
                duration: 3000,
                position: 'top'
              });
              toast.present();
            });

        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
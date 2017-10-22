import { MenuAcesso } from './../../../../../../providers/database/models/menu-acesso';
import { MenuService } from './../../../../../../providers/database/services/menu';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-edit',
  templateUrl: 'menu-edit.html',
})
export class MenuEditPage {
  menu: MenuAcesso;
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private menuSrvc: MenuService
  ) {
    console.log(this.navParams.data)
    if (this.navParams.data.menu)
      this.menu = this.navParams.data.menu;
    else
      this.menu = <MenuAcesso>{
        mnu_page: null,
        mnu_nome: null,
        mnu_descricao: null
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEditPage');
  }


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      mnu_page: [null, Validators.required],
      mnu_nome: [null, Validators.required],
      mnu_descricao: [null, Validators.required],
    });

    this.formulario.patchValue({
      mnu_page: this.menu.mnu_page,
      mnu_nome: this.menu.mnu_nome,
      mnu_descricao: this.menu.mnu_descricao,
    });
  }

  verificaValidTouched(campo: string) {
    this.formulario.get(campo).errors;
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    console.log(formGroup);
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  save() {
    if (this.formulario.valid) {

      this.menu.mnu_page = this.formulario.get('mnu_page').value;
      this.menu.mnu_nome = this.formulario.get('mnu_nome').value;
      this.menu.mnu_descricao = this.formulario.get('mnu_descricao').value;
      this.menuSrvc.exists('mnu_page',this.menu.mnu_page, this.menu.$key).then((exists) => {
        if (exists){
          let toast = this.toastCtrl.create({
            message: 'Já existe um registro criado com este página.',
            duration: 3000,
            position: 'top'
          });
          toast.present()  
          return;
        } else {
          let parsekey: any = this.menu;
          if (parsekey.$key) {
            this.menuSrvc.update(parsekey.$key, this.menu).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro atualizado com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present().then(() => this.navCtrl.pop());
            }).catch(()=>{
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro na alteração do registro.',
                duration: 3000,
                position: 'top',
              });
              toast.present();              
            });;
          } else {
            this.menuSrvc.create(this.menu).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Registro criado com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
              this.navCtrl.pop();
            }).catch(() => {
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro na criação do registro.',
                duration: 3000,
                position: 'top',
              });
              toast.present();          
            })
          }
        }
      })      
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
}

import { PerfilMenuService } from './../../../../../../providers/database/services/perfil-menu';
import { MenuAcesso } from './../../../../../../providers/database/models/menu-acesso';
import { MenuService } from './../../../../../../providers/database/services/menu';
import { FuncionalidadeService } from './../../../../../../providers/database/services/funcionalidade';
import { Funcionalidade } from './../../../../../../providers/database/models/funcionalidade';
import { PerfilFuncionalidadeService } from './../../../../../../providers/database/services/perfil-funcionalidade';
import { PerfilAcesso } from './../../../../../../providers/database/models/perfil-acesso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the PerfilConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-config',
  templateUrl: 'perfil-config.html',
})
export class PerfilConfigPage {
  perfil: PerfilAcesso;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public perfilFuncionalidadeSrvc: PerfilFuncionalidadeService,
    public funcionalidadeSrvc: FuncionalidadeService,
    public perfilMenuSrvc: PerfilMenuService,
    public menuSrvc: MenuService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    if (this.navParams.data.perfil) {
      this.perfil = this.navParams.data.perfil;
      this.perfilFuncionalidadeSrvc.get(this.perfil.$key)
      this.perfilMenuSrvc.get(this.perfil.$key)
    } else {
      this.perfil = <PerfilAcesso>{
        per_nome: "",
        per_descricao:""
      }
      this.navCtrl.setRoot('PerfilListPage');      
    }
  }

  editFuncionalidade(funcionalidade?: Funcionalidade) {
    let modal = this.modalCtrl.create('FuncionalidadeEditPage', { funcionalidade: funcionalidade });
    modal.present({
      ev: event
    });
  }
  selecionarFuncionalidade() {
    let funcionalidadeLista: Funcionalidade[] = [];
    this.funcionalidadeSrvc.funcionalidades.take(1).subscribe((funcionalidades: Funcionalidade[]) => {
      this.perfilFuncionalidadeSrvc.perfilFuncionalidades.take(1).subscribe((perfilFuncionalidades) => {
        funcionalidades.forEach((funcionalidade: Funcionalidade) => {
          if (perfilFuncionalidades.filter(x => x.$key == funcionalidade.$key).length == 0) {
            funcionalidadeLista.push(funcionalidade);
          }
        })
        if (funcionalidadeLista.length == 0) {
          let toast = this.toastCtrl.create({
            message: 'Todas as funcionalidades foram adicionadas.',
            duration: 3000,
            position: 'top'
          });
          toast.present()
        } else {
          let modal = this.modalCtrl.create('SelectFuncionalidadePage', { funcionalidades: funcionalidadeLista });
          modal.present();
          modal.onDidDismiss(data => {
            if (data)
              if (data.funcionalidadesSelecionadas) {
                data.funcionalidadesSelecionadas.forEach((funcionalidade: Funcionalidade) => {
                  this.perfilFuncionalidadeSrvc.create(funcionalidade.$key)
                });
              }
          })
        }
      })
    });
  }

  removerFuncionalidade(key: string) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.perfilFuncionalidadeSrvc.delete(key).then(() => {
              ;
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  editMenu(menu?: MenuAcesso) {
    let modal = this.modalCtrl.create('MenuEditPage', { menu: menu });
    modal.present({
      ev: event
    });
  }
  selecionarMenu() {
    let menuLista: MenuAcesso[] = [];
    this.menuSrvc.menus.take(1).subscribe((menus: MenuAcesso[]) => {
      this.perfilMenuSrvc.perfilMenus.take(1).subscribe((perfilMenus) => {
        menus.forEach((menu: MenuAcesso) => {
          if (perfilMenus.filter(x => x.$key == menu.$key).length == 0) {
            menuLista.push(menu);
          }
        })
        if (menuLista.length == 0) {
          let toast = this.toastCtrl.create({
            message: 'Todas as menus foram adicionadas.',
            duration: 3000,
            position: 'top'
          });
          toast.present()
        } else {
          let modal = this.modalCtrl.create('SelectMenuPage', { menus: menuLista });
          modal.present();
          modal.onDidDismiss(data => {
            if (data)
              if (data.menusSelecionados) {
                data.menusSelecionados.forEach((menu: MenuAcesso) => {
                  this.perfilMenuSrvc.create(menu.$key)
                });
              }
          })
        }
      })
    });
  }

  removerMenu(key: string) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.perfilMenuSrvc.delete(key).then(() => {
              ;
              let toast = this.toastCtrl.create({
                message: 'Registro excluído com sucesso',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

}

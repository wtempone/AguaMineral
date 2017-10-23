import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { PerfilAcesso } from '../../../../../../../providers/database/models/perfil-acesso';
import { Funcionalidade } from '../../../../../../../providers/database/models/funcionalidade';
import { PerfilFuncionalidadeAcaoService } from '../../../../../../../providers/database/services/perfil-funcionalidade-acao';
import { AcaoService } from '../../../../../../../providers/database/services/acao';
import { Acao } from '../../../../../../../providers/database/models/acao';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-perfil-funcionalidade-config',
  templateUrl: 'perfil-funcionalidade-config.html',
})
export class PerfilFuncionalidadeConfigPage {
  perfil: PerfilAcesso;
  funcionalidade: Funcionalidade;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public perfilFuncionalidadeAcaoSrvc: PerfilFuncionalidadeAcaoService,
    public acaoSrvc: AcaoService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController

  ) {
    if (this.navParams.data.perfil && this.navParams.data.funcionalidade) {
      this.perfil = this.navParams.data.perfil;
      this.funcionalidade = this.navParams.data.funcionalidade;
      this.perfilFuncionalidadeAcaoSrvc.getAll(this.perfil.$key, this.funcionalidade.$key)
      this.acaoSrvc.getAll(this.funcionalidade.$key)
      console.log(this.perfilFuncionalidadeAcaoSrvc.acoes)
    } else {
      this.perfil = <PerfilAcesso>{
        per_nome: "",
        per_descricao: ""
      }

      this.funcionalidade = <Funcionalidade>{
        fun_nome: "",
        fun_descricao: ""
      }

      this.navCtrl.setRoot('PerfilListPage');
    }
  }

  selecionarAcao() {
    let acoesLista: Acao[] = [];
    this.acaoSrvc.acoes.take(1).subscribe((acoes: Acao[]) => {
      this.perfilFuncionalidadeAcaoSrvc.perfilFuncionalidadeAcoes.take(1).subscribe((perfilFuncionalidadeAcoes) => {
        acoes.forEach((acao: Acao) => {
          if (perfilFuncionalidadeAcoes.filter(x => x.$key == acao.$key).length == 0) {
            acoesLista.push(acao);
          }
        })
        if (acoesLista.length == 0) {
          let toast = this.toastCtrl.create({
            message: 'Todas as acoes foram adicionadas.',
            duration: 3000,
            position: 'top'
          });
          toast.present()
        } else {
          let modal = this.modalCtrl.create('SelectFuncionalidadeAcaoPage', { acoes: acoes });
          modal.present();
          modal.onDidDismiss(data => {
            if (data)
              if (data.acoesSelecionadas) {
                data.acoesSelecionadas.forEach((acao: Acao) => {
                  this.perfilFuncionalidadeAcaoSrvc.create(acao.$key)
                });
              }
          })
        }
      })
    });

  }

  editAcao(obs: Observable<Acao>) {
    obs.take(1).subscribe(acao => {
      let modal = this.modalCtrl.create('AcaoEditPage', { acao: acao });
      modal.present({
        ev: event
      });
    })
  }

  removerAcao(obs: Observable<Acao>) {
    obs.take(1).subscribe(acao => {
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
              this.perfilFuncionalidadeAcaoSrvc.delete(acao.$key).then(() => {
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
    });
  }
}

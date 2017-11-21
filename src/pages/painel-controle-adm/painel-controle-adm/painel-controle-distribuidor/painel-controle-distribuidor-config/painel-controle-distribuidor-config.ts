import { DistribuidorService } from './../../../../../providers/database/services/distribuidor';
import { PerfilAcesso } from './../../../../../providers/database/models/perfil-acesso';
import { Usuario } from './../../../../../providers/database/models/usuario';
import { PerfilAcessoService } from './../../../../../providers/database/services/perfil-acesso';
import { UsuarioService } from './../../../../../providers/database/services/usuario';
import { Distribuidor } from './../../../../../providers/database/models/distribuidor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { PerfilUsuario } from '../../../../../providers/database/models/perfil-usuario';
import { FormaPagamentoService } from '../../../../../providers/database/services/forma-pagamento';
import { TipoPagamentoService } from '../../../../../providers/database/services/tipo-pagamento';
import { FormaPagamento } from '../../../../../providers/database/models/forma-pagamento';
import { TipoPagamento } from '../../../../../providers/database/models/tipo-pagamento';
import { DistribuidorFormaPagamento } from '../../../../../providers/database/models/distribuidor-forma-pagamento';

@IonicPage()
@Component({
  selector: 'page-painel-controle-distribuidor-config',
  templateUrl: 'painel-controle-distribuidor-config.html',
})
export class PainelControleDistribuidorConfigPage {
  distribuidor: Distribuidor;
  perfisDistribuidor: any[];
  funcionarios: Usuario[];
  configuracao = "geral";
  formasPagamento: any[];
  tiposPagamento: TipoPagamento[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    public perfilAcessoSrvc: PerfilAcessoService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public distribuidorSrvc: DistribuidorService,
    public formaPagamentoSrvc: FormaPagamentoService,
    public tipoPagamentoSrvc: TipoPagamentoService
  ) {
    if (navParams.data.distribuidor) {
      this.distribuidor = navParams.data.distribuidor;
      this.refresh();
    }
  }
  alterarDados(distribuidor) {
    this.navCtrl.push('DistribuidorEditPage', { distribuidor: distribuidor });
  }
  ativar() {
    this.distribuidor.dist_ativo = !this.distribuidor.dist_ativo;
    this.distribuidorSrvc.update(this.distribuidor.$key, this.distribuidor)
  }
  refresh() {
    this.perfisDistribuidor = [];
    this.funcionarios = [];
    (<any>Object).keys(this.distribuidor.dist_funcionarios).map(keyUsuario => {
      this.usuarioSrvc.get(keyUsuario).take(1).subscribe((usuario: Usuario) => {
        this.funcionarios.push(usuario);
      })
    })

    this.usuarioSrvc.usuarios.take(1).subscribe((usuarios: Usuario[]) => {
      (<any>Object).keys(this.distribuidor.dist_perfis).map(keyPerfil => {
        this.perfilAcessoSrvc.getByKey(keyPerfil).take(1).subscribe((perfil: PerfilAcesso) => {
          let perfisDistribuidor: any = perfil;
          perfisDistribuidor.per_usuarios = usuarios.filter(x => (<any>Object).entries(x.usr_perfis).filter(([key, value]) => key == perfil.$key && (value.per_distribuidora == true && value.per_keyDistribuidora == this.distribuidor.$key)).length > 0)
          this.perfisDistribuidor.push(perfisDistribuidor);
        })
      })
    })

    this.formasPagamento = [];
    this.formaPagamentoSrvc.formasPagamento.take(1).subscribe((formasPagamento: FormaPagamento[]) => {
      formasPagamento.forEach((formaPagamentoBase: FormaPagamento) => {
        let keysTipos = [];
        if (formaPagamentoBase.pag_tipos) {
          (<any>Object).keys(formaPagamentoBase.pag_tipos).forEach(key => {
            keysTipos.push(key);
          })
        }

        if (this.distribuidor.dist_formasPagamento) {
          formaPagamentoBase._selecionada = this.distribuidor.dist_formasPagamento.filter(x => x.key == formaPagamentoBase.$key).length > 0;
          if (formaPagamentoBase._selecionada) {
            if (formaPagamentoBase.pag_tipos) {
              if (this.distribuidor.dist_formasPagamento.filter(x => x.$key == formaPagamentoBase.$key)[0].pag_tipos) {
                let tiposPagamento = this.distribuidor.dist_formasPagamento.filter(x => x.$key == formaPagamentoBase.$key)[0].pag_tipos;
                formaPagamentoBase.pag_tipos.forEach((tipoPagamentoBase: TipoPagamento) => {
                  tipoPagamentoBase._selecionado == tiposPagamento.filter(x => x == tipoPagamentoBase.$key).length > 0;
                })
              }
            }
          }
        } else {
          formaPagamentoBase._selecionada = false;
        }
        let formaPagamento: any = formaPagamentoBase;
        formaPagamento.keysTipos = keysTipos;
        this.formasPagamento.push(formaPagamentoBase)
      })
      console.log('formasPagamento => ', this.formasPagamento);
    })
  }

  changeFormaPagamento(ev, index) {
    if (index < 0) return 0;
    let indexForma = 0;
    if (!this.distribuidor.dist_formasPagamento) {
      this.distribuidor.dist_formasPagamento = [];
    }
    if (ev == true) {
      if (this.distribuidor.dist_formasPagamento.filter(x => x.key == this.formasPagamento[index].key).length == 0) {
        this.distribuidor.dist_formasPagamento.push(<DistribuidorFormaPagamento>{
          key: this.formasPagamento[index].$key
        })
      } else {
      }
    } else {
      if (this.distribuidor.dist_formasPagamento.filter(x => x.key == this.formasPagamento[index].key).length > 0) {
        let ind = this.distribuidor.dist_formasPagamento.findIndex(x => x.key == this.formasPagamento[index]);
        this.distribuidor.dist_formasPagamento.splice(ind);
      }
    }
  }

  changeTipoPagamento(ev, index, iForma, keyTipoPagamento) {
    if (!keyTipoPagamento) return;

    let indexForma = this.distribuidor.dist_formasPagamento.findIndex(x => x.key == this.formasPagamento[iForma].$key);

    if (indexForma < 0) {
      this.changeFormaPagamento(true, iForma);
      indexForma = this.distribuidor.dist_formasPagamento.findIndex(x => x.key == this.formasPagamento[iForma].$key);
    }

    if (!this.distribuidor.dist_formasPagamento[indexForma].pag_tipos) {
      this.distribuidor.dist_formasPagamento[indexForma].pag_tipos = [];
    }
    if (ev == true) {
      if (this.distribuidor.dist_formasPagamento[indexForma].pag_tipos.filter(x => x == this.formasPagamento[indexForma].pag_tipos[index]).length == 0) {
        this.distribuidor.dist_formasPagamento.push(keyTipoPagamento)
      }
    } else {
      if (this.distribuidor.dist_formasPagamento[indexForma].pag_tipos.filter(x => x == this.formasPagamento[indexForma].pag_tipos[index]).length > 0) {
        let ind = this.distribuidor.dist_formasPagamento[indexForma].pag_tipos.findIndex(x => x == keyTipoPagamento);
        this.distribuidor.dist_formasPagamento[indexForma].pag_tipos.splice(ind);
      }
    }

    this.distribuidorSrvc.update(this.distribuidor.$key, this.distribuidor);
  }

  excluiPerfil(perfil, usuario) {
    let confirm = this.alertCtrl.create({
      title: 'Confirma exclusão',
      message: 'Deseja realmente excluir o usuário do grupo?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.usuarioSrvc.excluirPerfil(usuario.$key, perfil.$key).then(() => {
              this.refresh();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  selecionarUsuario(perfil) {
    let usuariosLista: Usuario[] = [];
    usuariosLista = this.funcionarios.filter(x => (<any>Object).entries(x.usr_perfis).filter(([key, value]) => key == perfil.$key && (value.per_distribuidora == true && value.per_keyDistribuidora == this.distribuidor.$key)).length == 0)
    if (usuariosLista.length == 0) {
      let toast = this.toastCtrl.create({
        message: 'Não há funcionarios para adicionar.',
        duration: 3000,
        position: 'top'
      });
      toast.present()
    } else {
      let modal = this.modalCtrl.create('SelectUsuarioPage', { usuarios: usuariosLista });
      modal.present();
      modal.onDidDismiss(data => {
        if (data)
          if (data.usuariosSelecionados) {
            let valorPerfil: PerfilUsuario = {
              per_distribuidora: true,
              per_keyDistribuidora: this.distribuidor.$key
            }
            data.usuariosSelecionados.forEach((usuario: Usuario) => {
              this.usuarioSrvc.addPerfil(usuario.$key, perfil.$key, valorPerfil).then(() => {
                this.refresh();
              })
            });
          }
      })
    }
  }

}

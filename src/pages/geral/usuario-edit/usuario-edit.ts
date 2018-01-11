import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../../providers/database/services/usuario';
import { InputPhotoComponent } from '../../../components/input-photo/input-photo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../providers/database/models/usuario';
import { DistribuidorService } from '../../../providers/database/services/distribuidor';
import { PerfilAcesso } from '../../../providers/database/models/perfil-acesso';
import { PerfilAcessoService } from '../../../providers/database/services/perfil-acesso';
import { Distribuidor } from '../../../providers/database/models/distribuidor';

@IonicPage()
@Component({
  selector: 'page-usuario-edit',
  templateUrl: 'usuario-edit.html',
})
export class UsuarioEditPage {
  usuario: Usuario;
  formulario: FormGroup;
  perfis = [];
  perfisDsitribuidor = [];
  @ViewChild(InputPhotoComponent) pro_img: InputPhotoComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrvc: UsuarioService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private distribuidorSrvc: DistribuidorService,
    private perfilSrvc: PerfilAcessoService
  ) {
    if (!this.usuarioSrvc.usuarioAtual) {
      this.navCtrl.pop();
    } else {
      (<any>Object).entries(this.usuarioSrvc.usuarioAtual.usr_perfis).map(([key, value]) => {
        this.perfilSrvc.getByKey(key).take(1).subscribe((perfil: PerfilAcesso) => {
          if (value.per_distribuidora) {
            this.distribuidorSrvc.get(value.per_keyDistribuidora).take(1).subscribe((distribuidor: Distribuidor) => {
              this.perfis.push({
                nome: perfil.per_nome,
                distribuidor: {
                  imagem: distribuidor.dist_img,
                  nome: distribuidor.dist_nome,
                }
              })
            })
          } else {
            this.perfis.push({
              nome: perfil.per_nome
            })
          }
        })
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioEditPage');
  }
  ngOnInit() {
    /*
  usr_nome: string;
  usr_email: string;
  usr_foto?: string;
  usr_senha?: string;
  usr_data?: Date;
  usr_nivel?: number;
  usr_status?: number;
  usr_endereco?: Endereco[];
  usr_perfis?: any[];
  usr_menus?: MenuAcesso[];
  usr_funcionalidades?: Funcionalidade[];
  usr_distribuidores?: string[];
  usr_carrinho?: Pedido;
     
    */
    this.formulario = this.formBuilder.group({
      usr_nome: [null, Validators.required],
    });

    this.formulario.patchValue({
      usr_nome: this.usuarioSrvc.usuarioAtual.usr_nome,
    });
  }

  adicionarEndereco() {
    alert('adicionarEndereco() não implementada')
  }
  excluirEndereco() {
    alert("excluirEndereco() não implementada")
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

  salvarProduto() {
    if (this.formulario.valid) {
      this.usuarioSrvc.usuarioAtual.usr_nome = this.formulario.get('usr_nome').value;
      if (this.usuarioSrvc.usuarioAtual.key) {
        this.usuarioSrvc.update(this.usuarioSrvc.usuarioAtual.key, this.usuarioSrvc.usuarioAtual).then(() => {
          this.mensagemFinal('Usuário alterado com sucesso.');
        })
      }
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  mensagemFinal(mensagem) {

    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      cssClass: 'toast-success'
    });
    toast.present();
    this.navCtrl.pop();
  }
}

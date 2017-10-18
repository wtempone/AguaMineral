import { EnderecoComponent } from './../../../components/endereco/endereco';
import { Endereco } from './../../../providers/database/models/geral';
import { MaskShared } from './../../../shared/masks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distribuidor } from './../../../providers/database/models/distribuidor';
import { UsuarioService } from './../../../providers/database/services/usuario';
import { DistribuidorService } from './../../../providers/database/services/distribuidor';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the DistribuidorEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribuidor-edit',
  templateUrl: 'distribuidor-edit.html',
})
export class DistribuidorEditPage {
  distribuidor: Distribuidor;
  formulario: FormGroup;
  @ViewChild(EnderecoComponent)
  private endereco: EnderecoComponent;  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public distribuidorSrvc: DistribuidorService,
    public usuarioSrvc: UsuarioService,
    private formBuilder: FormBuilder,
    private masks: MaskShared,
    private platform: Platform
  ) {
    this.distribuidor = this.navParams.data;
  }
  /*
    dist_nome: string;
    dist_cnpj: string;
    dist_telefone: string;
    dist_celular: string;
    dist_email: string;
    dist_img: string;
    dist_data: Date;
    dist_update_data: Date;
    dist_status: string;
    dist_online: boolean;
  */

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      dist_nome: [null, Validators.required],
      dist_cnpj: [null, Validators.compose([Validators.required, Validators.pattern(this.masks.cnpj.pattern)])],
      dist_telefone: [null],
      dist_celular: [null],
      dist_email: [null, Validators.compose([Validators.required, Validators.email])]
    });
    this.formulario.patchValue({
      dist_nome: this.distribuidor.dist_nome,
      dist_cnpj: this.distribuidor.dist_cnpj,
      dist_telefone: this.distribuidor.dist_telefone,
      dist_email: this.distribuidor.dist_email
    });
  }

  verificaValidTouched(campo: string) {
    this.formulario.get(campo).errors;
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  saveDistribuidor() {
    if (this.formulario.valid) {
      this.distribuidor.dist_nome = this.formulario.get('dist_nome').value;
      this.distribuidor.dist_cnpj = this.formulario.get('dist_cnpj').value;
      this.distribuidor.dist_telefone = this.formulario.get('dist_telefone').value;
      this.distribuidor.dist_celular = this.formulario.get('dist_celular').value;
      this.distribuidor.dist_email = this.formulario.get('dist_email').value;
      //this.distribuidor.dist_img = this.formulario.get('cep').value;
      this.distribuidor.dist_data = new Date(Date.now());
      this.distribuidor.dist_online = false;
      this.endereco.setAddress();
      let parsekey:any = this.distribuidor;
      if (parsekey.$key){
        this.distribuidorSrvc.update(parsekey.$key,this.distribuidor)
      } else {
        this.distribuidorSrvc.create(this.distribuidor)        
      }
    } else { 
      this.endereco.setAddress();      
      this.verificaValidacoesForm(this.formulario);
    }
  }
  selectEndereco(endereco: Endereco){
    this.distribuidor.dist_endereco = endereco;
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


}

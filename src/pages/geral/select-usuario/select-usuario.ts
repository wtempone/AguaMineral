import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Usuario } from '../../../providers/database/models/usuario';

@IonicPage()
@Component({
  selector: 'page-select-usuario',
  templateUrl: 'select-usuario.html',
})
export class SelectUsuarioPage {

  usuarios: Usuario[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController
  ) {
    if (this.navParams.data.usuarios) {
      this.usuarios = this.navParams.data.usuarios
    }
  }

  pronto(){
    let usuariosSelecionados: Usuario[] = []
    this.usuarios.forEach(usuario => {
      if (usuario._selecionado) {
        usuariosSelecionados.push(usuario);
      }
    });
      this.viewCtrl.dismiss({usuariosSelecionados: usuariosSelecionados});
  }
}

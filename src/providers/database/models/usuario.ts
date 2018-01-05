import { Pedido } from './pedido';
import { Endereco } from './shared-models';
import { PerfilAcesso } from './perfil-acesso';
import { MenuAcesso } from './menu-acesso';
import { Funcionalidade } from './funcionalidade';
export class Usuario {
  $key?: string;
  key?:string;
  usr_fb_id?: string;
  usr_fb_foto?: any;
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
  _selecionado?: boolean;
}

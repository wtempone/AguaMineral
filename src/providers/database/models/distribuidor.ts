import { Endereco } from './shared-models';
export interface Distribuidor {
  $key: string;
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
  dist_ativo: boolean;
  dist_endereco: Endereco;
  dist_perfis: any[]; 
  dist_funcionarios: any[]; 
}

"{{distribuidor.dist_endereco.rua + ', ' + distribuidor.dist_endereco.complemento + ', ' + distribuidor.dist_endereco.numero + ', ' + distribuidor.dist_endereco.bairro + ', ' + distribuidor.dist_endereco.cidade + ', ' + distribuidor.dist_endereco.estado + ' / ' + distribuidor.dist_endereco.uf + ' -  ' + distribuidor.dist_endereco.cep}}"
import { Endereco } from './shared-models';
import { FormaPagamento } from './forma-pagamento';
import { DistribuidorFormaPagamento } from './distribuidor-forma-pagamento';

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
  dist_formasPagamento: DistribuidorFormaPagamento[];
}

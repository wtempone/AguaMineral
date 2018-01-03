import { Endereco } from './shared-models';
import { Usuario } from './usuario';
import { Distribuidor } from "./distribuidor";
import { DistribuidorProduto } from './distribuidor-produto';
import { FormaPagamento } from './forma-pagamento';



export class PedidoHistorico {
  $key?: string;
  key?:string;  
  status: string;
  data: Date;
  observacao?: string;
}

export class Pedido {
  $key?: string;
  key?:string;  
  distribuidor?: Distribuidor;
  usuario?: Usuario;
  produtos?: DistribuidorProduto[];
  taxa?: number;
  enderecoEntrega?: Endereco;
  total?: number;
  formaPagamento?: FormaPagamento;
  troco?: number;
  status?: string;
  historico?: PedidoHistorico[];
  _selecionado: boolean;
}

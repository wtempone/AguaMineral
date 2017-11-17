import { Endereco } from './shared-models';
import { Usuario } from './usuario';
import { Distribuidor } from "./distribuidor";
import { DistribuidorProduto } from './distribuidor-produto';


export class Pedido {
  $key?: string;
  key?:string;  
  distribuidor?: Distribuidor;
  usuario?: Usuario;
  produtos?: DistribuidorProduto[];
  taxa?: number;
  enderecoEntrega?: Endereco;
  total?: number;
  _selecionado: boolean;
}

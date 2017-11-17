import { Endereco } from './shared-models';
import { Produto } from './produto';
import { DistribuidorCategoria } from './distribuidor-categoria';
export interface DistribuidorProduto {
  $key: string;
  key: string;
  dist_produto: string;
  dist_preco: number;
  dist_categoria: string;
  dist_quantidade: number;
  dist_total: number;
  dist_observacao: string;
  produto: Produto;
  categoria: DistribuidorCategoria;  
}

import { Endereco } from './shared-models';
import { Produto } from './produto';
export interface DistribuidorProduto {
  $key: string;
  dist_produto: string;
  dist_preco: number;
  dist_categoria: string;
}

import { Endereco } from './shared-models';
import { Produto } from './produto';
import { DistribuidorCategoria } from './distribuidor-categoria';
export interface DistribuidorProduto {
  $key: string;
  dist_produto: string;
  dist_preco: number;
  dist_categoria: string;
  produto: Produto;
  categoria: DistribuidorCategoria;
}

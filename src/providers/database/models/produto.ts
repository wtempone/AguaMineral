import { Marca } from "./marca";

export interface Produto {
  $key: string;
  pro_nome: string;
  pro_img: string;
  pro_descricao: string;
  pro_marca: Marca;
  pro_ativo: boolean;
}
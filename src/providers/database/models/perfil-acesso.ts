import { Funcionalidade } from "./funcionalidade";
import { MenuAcesso } from "./menu-acesso";

export interface PerfilAcesso {
  $key: string;
  per_nome: string;
  per_mnemonico: string;
  per_descricao: string;
  per_menu: MenuAcesso[]
  per_funcionalidades: Funcionalidade[]
}


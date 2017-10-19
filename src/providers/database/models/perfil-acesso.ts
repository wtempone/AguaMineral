export interface Acao {
  aca_nome: string;
  aca_mnemonico: string;
}

export interface Funcionalidade {
  fun_nome: string;
  fun_mnemonico: string;
  fun_acoes: Acao[]
}

export interface PerfilAcesso {
  per_nome: string;
  per_mnemonico: string;
  per_menu: MenuAcesso[]
  per_funcionalidades: Funcionalidade[]
}

export interface MenuAcesso {
  mnu_nome: string;
  mnu_page: string;
}


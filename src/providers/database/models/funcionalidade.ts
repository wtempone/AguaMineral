import { Acao } from './acao';
export interface Funcionalidade {
    $key: string;
    fun_nome: string;
    fun_mnemonico: string;
    fun_descricao: string;
    fun_acoes: Acao[]
  }
import { TipoPagamento } from "./tipo-pagamento";

export interface FormaPagamento {
    $key:string;
    pag_mnemonico: string;
    pag_descricao: string
    pag_img: string
    pag_tipos: TipoPagamento;
    _selecionada: boolean;    
}
import { Endereco } from './shared-models';
import { Usuario } from './usuario';
import { Distribuidor } from "./distribuidor";
import { DistribuidorProduto } from './distribuidor-produto';
import { FormaPagamento } from './forma-pagamento';
import { Funcionario } from './funcionario';

export class StatusPedido{
  status: string;
  MensagemUsuario: string;
  MensagemDistribuidor: string;
  icon: string;
}
export const DicionarioStatusPedido: StatusPedido[] = [
  {
    status: 'Realizado',
    MensagemUsuario: 'Seu pedido foi realizado com sucesso',
    MensagemDistribuidor: 'Pedido recebido, aguardando confirmação',
    icon: 'clipboard' // clipboard, flag, 
  },
  {
    status: 'Confirmado',
    MensagemUsuario: 'O distribuidor está preparando o seu pedido',
    MensagemDistribuidor: 'Monte o pedido do cliente',
    icon: 'thumbs-up'
  },
  {
    status: 'Montado',
    MensagemUsuario: 'Seu peddido foi montado e está aguardando entrega',
    MensagemDistribuidor: 'Disponibilize o pedido para um entregador ',
    icon: 'basket' // cube
  },
  {
    status: 'Saiu para a entrega',
    MensagemUsuario: 'Seu pedido saiu para entrega',
    MensagemDistribuidor: 'Pedido despachado aguardando entrega',
    icon: 'navigate' //exit
  },
  {
    status: 'Entrega Realizada',
    MensagemUsuario: 'Seu pedido entregue com sucesso.',
    MensagemDistribuidor: 'Pedido em mãos do cliente',
    icon: 'checkmark'
  },
  {
    status: 'Finalizado',
    MensagemUsuario: 'Seu pedido foi finalizado com sucesso.',
    MensagemDistribuidor: 'Pedido Finalizado',
    icon: 'done-all'
  },
  {
    status: 'Cancelado',
    MensagemUsuario: 'Seu pedido foi cancelado.',
    MensagemDistribuidor: 'Pedido Cancelado',
    icon: 'trash'
  },
]


export class PedidoHistorico {
  $key?: string;
  key?:string;  
  status: number;
  data: Date;
  observacao?: string;
}

export class Pedido {
  $key?: string;
  key?:string;
  previsao: string;  
  distancia_value: number;
  duracao_value: number;
  distancia_text: string;
  duracao_text: string;
  distribuidor?: Distribuidor;
  usuario?: Usuario;
  entregador?: Usuario;
  produtos?: DistribuidorProduto[];
  taxa?: number;
  enderecoEntrega?: Endereco;
  total?: number;
  formaPagamento?: FormaPagamento;
  troco?: number;
  status?: number;
  historico?: PedidoHistorico[];
  _selecionado: boolean;
}

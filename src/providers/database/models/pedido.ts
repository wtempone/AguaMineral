import { Endereco } from './shared-models';
import { Usuario } from './usuario';
import { Distribuidor } from "./distribuidor";
import { DistribuidorProduto } from './distribuidor-produto';
import { FormaPagamento } from './forma-pagamento';

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
    icon: 'alert'
  },
  {
    status: 'Confirmado',
    MensagemUsuario: 'O distribuidor está preparando o seu pedido',
    MensagemDistribuidor: 'Monte o pedido do cliente',
    icon: 'alert'
  },
  {
    status: 'Montado',
    MensagemUsuario: 'Seu peddido foi montado e está aguardando entrega',
    MensagemDistribuidor: 'Disponibilize o pedido para um entregador ',
    icon: 'alert'
  },
  {
    status: 'Saiu para a entrega',
    MensagemUsuario: 'Seu peddido saiu para entrega',
    MensagemDistribuidor: 'Pedido despachado aguardando entrega',
    icon: 'alert'
  },
  {
    status: 'Entrega Realizada',
    MensagemUsuario: 'Seu pedido entregue com sucesso.',
    MensagemDistribuidor: 'Pedido em mãos do cliente',
    icon: 'alert'
  },
  {
    status: 'Finalizado',
    MensagemUsuario: 'Seu pedido foi finalizado com sucesso.',
    MensagemDistribuidor: 'Pedido Finalizado',
    icon: 'alert'
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

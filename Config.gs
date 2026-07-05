/**
 * Configurações centralizadas do sistema BOM PASTOR.
 */
const APP_CONFIG = Object.freeze({
  appName: 'BOM PASTOR - Consulta de Pedidos',
  menuName: 'Consulta de Pedidos',
  menuOpenLabel: 'Abrir Sistema',
  dialogWidth: 1180,
  dialogHeight: 760,
  sheets: Object.freeze({
    sistema: 'Sistema',
    pedidos: 'Pedidos',
    clientes: 'Clientes',
    componentes: 'Componentes',
    config: 'Config',
    log: 'Log'
  }),
  statuses: Object.freeze({
    producao: 'Produção',
    separacao: 'Separação',
    expedicao: 'Expedição',
    entregue: 'Entregue',
    cancelado: 'Cancelado'
  })
});

/**
 * Cabeçalhos oficiais das abas usadas como banco de dados.
 */
const SHEET_HEADERS = Object.freeze({
  Pedidos: Object.freeze(['Pedido', 'Data', 'Status', 'CodigoCliente', 'Transportadora', 'Volumes', 'Observacoes', 'ValorTotal']),
  Clientes: Object.freeze(['Codigo', 'Nome', 'Cidade', 'UF', 'Telefone', 'CRM']),
  Componentes: Object.freeze(['Pedido', 'Item', 'Codigo', 'Descricao', 'Cor', 'Quantidade', 'Linha', 'NF', 'Status']),
  Config: Object.freeze(['Chave', 'Valor']),
  Log: Object.freeze(['DataHora', 'Acao', 'Detalhes'])
});

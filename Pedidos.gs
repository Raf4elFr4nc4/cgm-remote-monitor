/**
 * Pesquisa um pedido e retorna todos os dados necessários para renderização.
 * @param {string|number} numeroPedido Número do pedido digitado pelo usuário.
 * @returns {Object} Resultado estruturado da pesquisa.
 */
function pesquisarPedidoBackend(numeroPedido) {
  const pedidoNormalizado = normalizar_(numeroPedido);

  if (!pedidoNormalizado) {
    return { sucesso: false, mensagem: 'Digite um número de pedido para pesquisar.' };
  }

  const spreadsheet = obterSpreadsheet_();
  const sheets = APP_CONFIG.sheets;
  const pedidos = lerRegistros_(spreadsheet.getSheetByName(sheets.pedidos));
  const clientes = lerRegistros_(spreadsheet.getSheetByName(sheets.clientes));
  const componentes = lerRegistros_(spreadsheet.getSheetByName(sheets.componentes));
  const pedido = pedidos.find(registro => normalizar_(registro.Pedido) === pedidoNormalizado);

  if (!pedido) {
    registrarLog_('Pesquisa sem resultado', `Pedido: ${pedidoNormalizado}`);
    return { sucesso: false, mensagem: `Pedido ${pedidoNormalizado} não encontrado.` };
  }

  const cliente = buscarClientePorCodigo_(clientes, pedido.CodigoCliente);
  const componentesDoPedido = buscarComponentesPorPedido_(componentes, pedido.Pedido);
  const resultado = {
    sucesso: true,
    cards: criarCardsResumo_(pedido, componentesDoPedido),
    cliente: serializarCliente_(cliente),
    pedido: serializarPedido_(pedido),
    componentes: serializarComponentes_(componentesDoPedido)
  };

  registrarLog_('Pesquisa realizada', `Pedido: ${pedidoNormalizado}`);
  return resultado;
}

/**
 * Cria os quatro cards de resumo do pedido.
 * @param {Object} pedido Registro do pedido.
 * @param {Object[]} componentes Componentes associados ao pedido.
 * @returns {Object[]} Cards para exibição.
 */
function criarCardsResumo_(pedido, componentes) {
  return [
    { titulo: 'Pedido', valor: normalizar_(pedido.Pedido), icone: 'receipt_long', cor: 'blue' },
    { titulo: 'Status', valor: normalizar_(pedido.Status), icone: 'inventory_2', cor: 'green', status: normalizar_(pedido.Status) },
    { titulo: 'Quantidade de Itens', valor: String(componentes.length), icone: 'category', cor: 'orange' },
    { titulo: 'Valor Total', valor: formatarMoeda_(pedido.ValorTotal), icone: 'payments', cor: 'purple' }
  ];
}

/**
 * Serializa o pedido para consumo no front-end.
 * @param {Object} pedido Registro do pedido.
 * @returns {Object} Pedido serializado.
 */
function serializarPedido_(pedido) {
  return {
    pedido: normalizar_(pedido.Pedido),
    data: formatarData_(pedido.Data),
    status: normalizar_(pedido.Status),
    transportadora: normalizar_(pedido.Transportadora),
    volumes: normalizar_(pedido.Volumes),
    observacoes: normalizar_(pedido.Observacoes)
  };
}

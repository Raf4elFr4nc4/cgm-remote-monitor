/**
 * Filtra os componentes vinculados ao pedido informado.
 * @param {Object[]} componentes Componentes carregados em memória.
 * @param {*} numeroPedido Número do pedido.
 * @returns {Object[]} Componentes encontrados.
 */
function buscarComponentesPorPedido_(componentes, numeroPedido) {
  const pedidoNormalizado = normalizar_(numeroPedido);
  return componentes.filter(componente => normalizar_(componente.Pedido) === pedidoNormalizado);
}

/**
 * Serializa componentes para consumo no front-end.
 * @param {Object[]} componentes Componentes do pedido.
 * @returns {Object[]} Componentes serializados.
 */
function serializarComponentes_(componentes) {
  return componentes.map(componente => ({
    item: normalizar_(componente.Item),
    codigo: normalizar_(componente.Codigo),
    descricao: normalizar_(componente.Descricao),
    cor: normalizar_(componente.Cor),
    quantidade: normalizar_(componente.Quantidade),
    linha: normalizar_(componente.Linha),
    nf: normalizar_(componente.NF),
    status: normalizar_(componente.Status)
  }));
}

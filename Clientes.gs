/**
 * Busca um cliente pelo código informado.
 * @param {Object[]} clientes Lista de clientes já carregada em memória.
 * @param {*} codigo Código do cliente.
 * @returns {Object|null} Cliente encontrado ou nulo.
 */
function buscarClientePorCodigo_(clientes, codigo) {
  const codigoNormalizado = normalizar_(codigo);
  return clientes.find(cliente => normalizar_(cliente.Codigo) === codigoNormalizado) || null;
}

/**
 * Serializa o cliente para o formato esperado pela interface.
 * @param {Object|null} cliente Registro do cliente.
 * @returns {Object} Cliente serializado.
 */
function serializarCliente_(cliente) {
  if (!cliente) {
    return { nome: '', codigo: '', cidade: '', uf: '', telefone: '', crm: '' };
  }

  return {
    nome: normalizar_(cliente.Nome),
    codigo: normalizar_(cliente.Codigo),
    cidade: normalizar_(cliente.Cidade),
    uf: normalizar_(cliente.UF),
    telefone: normalizar_(cliente.Telefone),
    crm: normalizar_(cliente.CRM)
  };
}

/**
 * Retorna a planilha ativa com uma única chamada reutilizável.
 * @returns {Spreadsheet} Planilha ativa.
 */
function obterSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Obtém uma aba existente ou cria uma nova aba com o nome informado.
 * @param {Spreadsheet} spreadsheet Planilha ativa.
 * @param {string} nome Nome da aba.
 * @returns {Sheet} Aba encontrada ou criada.
 */
function obterOuCriarAba_(spreadsheet, nome) {
  return spreadsheet.getSheetByName(nome) || spreadsheet.insertSheet(nome);
}

/**
 * Garante que a primeira linha da aba contenha os cabeçalhos esperados.
 * @param {Sheet} sheet Aba que receberá os cabeçalhos.
 * @param {string[]} headers Lista de cabeçalhos.
 */
function garantirCabecalhos_(sheet, headers) {
  const ultimaColuna = Math.max(sheet.getLastColumn(), headers.length);
  const valoresAtuais = sheet.getRange(1, 1, 1, ultimaColuna).getValues()[0];
  const precisaAtualizar = headers.some((header, index) => valoresAtuais[index] !== header);

  if (precisaAtualizar) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

/**
 * Converte linhas de uma aba em objetos usando os cabeçalhos da primeira linha.
 * @param {Sheet} sheet Aba de origem.
 * @returns {Object[]} Registros da aba.
 */
function lerRegistros_(sheet) {
  const range = sheet.getDataRange();
  const values = range.getValues();

  if (values.length <= 1) {
    return [];
  }

  const headers = values[0].map(String);
  return values.slice(1).filter(linha => linha.some(celula => celula !== '')).map(linha => {
    return headers.reduce((registro, header, index) => {
      registro[header] = linha[index];
      return registro;
    }, {});
  });
}

/**
 * Normaliza texto para comparação segura.
 * @param {*} valor Valor a normalizar.
 * @returns {string} Texto normalizado.
 */
function normalizar_(valor) {
  return String(valor || '').trim();
}

/**
 * Formata datas do Apps Script para texto pt-BR.
 * @param {*} valor Valor de data.
 * @returns {string} Data formatada.
 */
function formatarData_(valor) {
  if (!valor) return '';
  if (Object.prototype.toString.call(valor) !== '[object Date]') return String(valor);
  return Utilities.formatDate(valor, Session.getScriptTimeZone(), 'dd/MM/yyyy');
}

/**
 * Formata valores monetários para BRL.
 * @param {*} valor Valor numérico.
 * @returns {string} Valor em real brasileiro.
 */
function formatarMoeda_(valor) {
  const numero = Number(valor || 0);
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Registra eventos simples na aba Log sem interromper o fluxo principal.
 * @param {string} acao Ação executada.
 * @param {string} detalhes Detalhes adicionais.
 */
function registrarLog_(acao, detalhes) {
  const spreadsheet = obterSpreadsheet_();
  const logSheet = obterOuCriarAba_(spreadsheet, APP_CONFIG.sheets.log);
  logSheet.appendRow([new Date(), acao, detalhes || '']);
}

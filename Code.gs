/**
 * BOM PASTOR - Sistema de Consulta de Pedidos.
 * Arquivo principal do Web App e ponto de entrada do HTML Service.
 */

/**
 * Renderiza a aplicação quando publicada como Web App.
 * @returns {HtmlOutput} Interface principal do sistema.
 */
function doGet() {
  return criarInterfaceHtml_();
}

/**
 * Cria o HTML final a partir do arquivo index.html.
 * @returns {HtmlOutput} Saída HTML configurada para dialog/web app.
 */
function criarInterfaceHtml_() {
  const template = HtmlService.createTemplateFromFile('index');

  return template
    .evaluate()
    .setTitle(APP_CONFIG.appName)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Inclui arquivos HTML parciais dentro do template principal.
 * @param {string} nomeArquivo Nome do arquivo sem extensão.
 * @returns {string} Conteúdo HTML do arquivo informado.
 */
function include(nomeArquivo) {
  return HtmlService.createHtmlOutputFromFile(nomeArquivo).getContent();
}

/**
 * Executa a preparação inicial do sistema.
 * Pode ser chamada manualmente no editor do Apps Script.
 */
function instalarSistema() {
  prepararPlanilhasSistema();
  onOpen();
}

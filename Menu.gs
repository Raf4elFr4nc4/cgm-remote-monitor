/**
 * Cria o menu customizado sempre que a planilha é aberta.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu(APP_CONFIG.menuName)
    .addItem(APP_CONFIG.menuOpenLabel, 'abrirSistema')
    .addToUi();
}

/**
 * Abre o sistema em um dialog centralizado do Google Sheets.
 */
function abrirSistema() {
  prepararPlanilhasSistema();
  const html = criarInterfaceHtml_();

  SpreadsheetApp.getUi().showModalDialog(
    html.setWidth(APP_CONFIG.dialogWidth).setHeight(APP_CONFIG.dialogHeight),
    APP_CONFIG.appName
  );
}

/**
 * Cria e organiza as abas necessárias, mantendo apenas Sistema visível.
 */
function prepararPlanilhasSistema() {
  const spreadsheet = obterSpreadsheet_();
  const nomes = Object.values(APP_CONFIG.sheets);

  nomes.forEach(nome => obterOuCriarAba_(spreadsheet, nome));

  Object.keys(SHEET_HEADERS).forEach(nome => {
    garantirCabecalhos_(spreadsheet.getSheetByName(nome), SHEET_HEADERS[nome]);
  });

  spreadsheet.getSheetByName(APP_CONFIG.sheets.sistema).showSheet();

  nomes.filter(nome => nome !== APP_CONFIG.sheets.sistema).forEach(nome => {
    spreadsheet.getSheetByName(nome).hideSheet();
  });
}

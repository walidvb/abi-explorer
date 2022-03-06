import * as vscode from 'vscode';



export const createPreview = () => {
  const webview = vscode.window.createWebviewPanel(
    'html.preview',
    'ABI Explorer',
    vscode.ViewColumn.One
  );
  const ABI = getActiveFileContent();
  webview.webview.html = `<h1>${ABI}</h1>`;
};

const getActiveFileContent = () => {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    //For Getting File Path
    let document = activeEditor.document;

    // Get the document text
    const documentText = document.getText();

    return documentText;
  }
};
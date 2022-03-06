import * as vscode from 'vscode';

export const createPreview = () => {
  const webview = vscode.window.createWebviewPanel(
    'html.preview',
    'ABI Explorer',
    vscode.ViewColumn.One
  );
  webview.webview.html = `<h1>hello</h1>`;
};

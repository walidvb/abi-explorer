import * as vscode from 'vscode';



export const createPreview = () => {
  const ABI = getActiveFileContent();
  if (!ABI) {
    return;
  }
  const html = buildPreview(JSON.parse(ABI));
  buildWebview(html);
};

const buildPreview = (abi: any) => {
  let html = `<h1>ABI Preview</h1>`;
  const grouped = abi.reduce((acc: any, curr: any) => {
    const key = `_${curr.type}`;
    acc[key] = acc[key] ? [...acc[key], curr] : [curr];
    return acc;
  }, {});

  for (let key in grouped) {
    html += renderGroup(grouped[key], key);
  }
  return `<div style="margin: auto; max-width: 800px; width: 100%; padding: 4rem 1rem; line-height: 1.42;">
    ${html}
  </div>`;
};

const renderGroup = (elems: any[], name: string) => {
  if (!elems[0]?.inputs) {
    return '';
  }
  return `
    <h2>${name.substring(1, name.length)}</h2>
    <ul style="font-size: 1rem; font-weight: normal;">
      ${elems
        .map(
          (elem) => `
        <li style="margin-bottom: 0.5rem;">
          ${elem.name || name}
          <span style="opacity: 0.7;"> (${elem.inputs
            .map(
              (i: any) => `
              ${i.name}:
              <span style="opacity: 0.5;">
              ${i.type}
              </span>
            `
            )
            .join(', ')}
          )</span>
        </li>
      `
        )
        .join('')}
    </ul>
  `;
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

const buildWebview = (html: string) => {
  const webview = vscode.window.createWebviewPanel(
    'html.preview',
    'ABI Explorer',
    vscode.ViewColumn.One
  );
  webview.webview.html = `<h1>${html}</h1>`;
};
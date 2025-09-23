export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const createHtmlDocument = (bodyContent: string, title = 'Markdown Document') => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        pre { background-color: #f6f8fa; padding: 16px; border-radius: 3px; overflow: auto; }
        code { font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; }
        blockquote { padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; }
        img { max-width: 100%; }
        table { border-collapse: collapse; }
        table th, table td { border: 1px solid #dfe2e5; padding: 6px 13px; }
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>`;
};
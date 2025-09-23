import { useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { ToolbarAction, InsertTextOptions } from './types';

export const useMarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  // marked.jsの設定
  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true
    });

    // シンタックスハイライトの設定
    marked.use({
      renderer: {
        code(code: string, infostring: string | undefined) {
          const lang = infostring || '';
          if (lang && hljs.getLanguage(lang)) {
            const highlighted = hljs.highlight(code, { language: lang }).value;
            return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
          }
          const highlighted = hljs.highlightAuto(code).value;
          return `<pre><code class="hljs">${highlighted}</code></pre>`;
        }
      }
    });
  }, []);

  // ローカルストレージからの復元
  useEffect(() => {
    const savedText = localStorage.getItem('markdownText');
    if (savedText) {
      setMarkdownText(savedText);
    }
  }, []);

  // マークダウンのレンダリング
  const renderMarkdown = useCallback(async (text: string) => {
    const html = await marked.parse(text);
    setHtmlContent(html);
  }, []);

  // テキスト変更時の処理
  const handleTextChange = useCallback((text: string) => {
    setMarkdownText(text);
    renderMarkdown(text);
    localStorage.setItem('markdownText', text);
  }, [renderMarkdown]);

  // 選択範囲変更時の処理
  const handleSelectionChange = useCallback((start: number, end: number) => {
    setSelectionStart(start);
    setSelectionEnd(end);
  }, []);

  // カーソル位置にテキストを挿入
  const insertTextAtCursor = useCallback((text: string, _options?: InsertTextOptions) => {
    const selectedText = markdownText.substring(selectionStart, selectionEnd);

    let newText: string;

    if (selectedText) {
      // 選択部分をフォーマット
      const formattedText = text.replace('$1', selectedText);
      newText =
        markdownText.substring(0, selectionStart) +
        formattedText +
        markdownText.substring(selectionEnd);
    } else {
      // カーソル位置に挿入
      newText =
        markdownText.substring(0, selectionStart) +
        text +
        markdownText.substring(selectionEnd);
    }

    setMarkdownText(newText);
    renderMarkdown(newText);
    localStorage.setItem('markdownText', newText);

    // 選択範囲を設定 (将来の実装で使用予定)
  }, [markdownText, selectionStart, selectionEnd, renderMarkdown]);

  // ツールバーアクションの処理
  const handleToolbarAction = useCallback((action: ToolbarAction) => {
    const selectedText = markdownText.substring(selectionStart, selectionEnd);
    const textBeforeCursor = markdownText.substring(0, selectionStart);
    const lastNewLinePos = textBeforeCursor.lastIndexOf('\n');
    const isAtLineStart = lastNewLinePos === selectionStart - 1 || selectionStart === 0;

    switch (action) {
      case 'bold':
        insertTextAtCursor('**$1**', { selectionStart: 2, selectionEnd: selectedText ? selectedText.length + 2 : 2 });
        break;
      case 'italic':
        insertTextAtCursor('*$1*', { selectionStart: 1, selectionEnd: selectedText ? selectedText.length + 1 : 1 });
        break;
      case 'heading':
        if (isAtLineStart) {
          insertTextAtCursor('## ', { selectionStart: 3, selectionEnd: 3 });
        } else {
          insertTextAtCursor('\n## ', { selectionStart: 4, selectionEnd: 4 });
        }
        break;
      case 'link':
        if (selectedText) {
          insertTextAtCursor('[' + selectedText + '](url)', {
            selectionStart: selectedText.length + 3,
            selectionEnd: selectedText.length + 6
          });
        } else {
          insertTextAtCursor('[リンクテキスト](url)', { selectionStart: 1, selectionEnd: 7 });
        }
        break;
      case 'image':
        insertTextAtCursor('![代替テキスト](画像のURL)', { selectionStart: 2, selectionEnd: 8 });
        break;
      case 'list':
        if (isAtLineStart) {
          insertTextAtCursor('- ', { selectionStart: 2, selectionEnd: 2 });
        } else {
          insertTextAtCursor('\n- ', { selectionStart: 3, selectionEnd: 3 });
        }
        break;
      case 'code':
        if (selectedText) {
          if (selectedText.includes('\n')) {
            insertTextAtCursor('```\n' + selectedText + '\n```', {
              selectionStart: 4,
              selectionEnd: 4 + selectedText.length
            });
          } else {
            insertTextAtCursor('`' + selectedText + '`', {
              selectionStart: 1,
              selectionEnd: 1 + selectedText.length
            });
          }
        } else {
          insertTextAtCursor('```\nコードをここに入力\n```', { selectionStart: 4, selectionEnd: 13 });
        }
        break;
      case 'quote':
        if (isAtLineStart) {
          insertTextAtCursor('> ', { selectionStart: 2, selectionEnd: 2 });
        } else {
          insertTextAtCursor('\n> ', { selectionStart: 3, selectionEnd: 3 });
        }
        break;
      case 'horizontalRule':
        if (isAtLineStart) {
          insertTextAtCursor('---\n', { selectionStart: 4, selectionEnd: 4 });
        } else {
          insertTextAtCursor('\n---\n', { selectionStart: 5, selectionEnd: 5 });
        }
        break;
      case 'save':
        handleSave();
        break;
      case 'clear':
        handleClear();
        break;
    }
  }, [markdownText, selectionStart, selectionEnd, insertTextAtCursor]);

  // 保存処理
  const handleSave = useCallback(() => {
    // マークダウンファイルとして保存
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown_document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // HTMLファイルとしても保存
    const htmlDocument = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Markdown Document</title>
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
    ${htmlContent}
</body>
</html>`;

    const htmlBlob = new Blob([htmlDocument], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'markdown_document.html';
    document.body.appendChild(htmlLink);
    htmlLink.click();
    document.body.removeChild(htmlLink);
    URL.revokeObjectURL(htmlUrl);
  }, [markdownText, htmlContent]);

  // クリア処理
  const handleClear = useCallback(() => {
    if (confirm('エディタの内容をクリアしますか？')) {
      setMarkdownText('');
      setHtmlContent('');
      localStorage.removeItem('markdownText');
    }
  }, []);

  // 初期レンダリング
  useEffect(() => {
    renderMarkdown(markdownText);
  }, [markdownText, renderMarkdown]);

  return {
    markdownText,
    htmlContent,
    handleTextChange,
    handleSelectionChange,
    handleToolbarAction,
  };
};
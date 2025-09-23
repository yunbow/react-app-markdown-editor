import React from 'react';
import { Text } from '../../../components/Text';
import { Toolbar } from '../components/Toolbar';
import { EditorPanel } from '../components/EditorPanel';
import { PreviewPanel } from '../components/PreviewPanel';
import { useMarkdownEditor } from '../useMarkdownEditor';
import styles from './MarkdownEditor.module.css';

export const MarkdownEditor: React.FC = () => {
  const {
    markdownText,
    htmlContent,
    handleTextChange,
    handleSelectionChange,
    handleToolbarAction,
  } = useMarkdownEditor();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Text variant="h1">マークダウンエディタ</Text>
        <Toolbar onAction={handleToolbarAction} />
      </header>

      <main className={styles.main}>
        <EditorPanel
          value={markdownText}
          onChange={handleTextChange}
          onSelectionChange={handleSelectionChange}
        />
        <PreviewPanel htmlContent={htmlContent} />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};
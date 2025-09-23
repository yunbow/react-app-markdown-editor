import React from 'react';
import { Text } from '../../../../components/Text';
import styles from './PreviewPanel.module.css';

export interface PreviewPanelProps {
  htmlContent: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ htmlContent }) => {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <Text variant="h2">プレビュー</Text>
      </div>
      <div
        className={styles.preview}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};
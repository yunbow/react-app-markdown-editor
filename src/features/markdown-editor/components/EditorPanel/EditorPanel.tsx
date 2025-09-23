import React from 'react';
import { Text } from '../../../../components/Text';
import { TextArea } from '../../../../components/TextArea';
import styles from './EditorPanel.module.css';

export interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  onSelectionChange?: (start: number, end: number) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  value,
  onChange,
  onSelectionChange,
}) => {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <Text variant="h2">マークダウン</Text>
      </div>
      <TextArea
        value={value}
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        placeholder="マークダウンを入力してください..."
      />
    </div>
  );
};
import React from 'react';
import { Button } from '../../../../components/Button';
import { ToolbarAction } from '../../types';
import styles from './Toolbar.module.css';

interface ToolbarConfig {
  id: ToolbarAction;
  title: string;
  icon: string;
}

export interface ToolbarProps {
  onAction: (action: ToolbarAction) => void;
}

const toolbarButtons: ToolbarConfig[] = [
  { id: 'bold', title: '太字', icon: 'B' },
  { id: 'italic', title: '斜体', icon: 'I' },
  { id: 'heading', title: '見出し', icon: 'H' },
  { id: 'link', title: 'リンク', icon: '🔗' },
  { id: 'image', title: '画像', icon: '🖼️' },
  { id: 'list', title: '箇条書き', icon: '•' },
  { id: 'code', title: 'コード', icon: '{ }' },
  { id: 'quote', title: '引用', icon: '❝' },
  { id: 'horizontalRule', title: '水平線', icon: '―' },
  { id: 'save', title: '保存', icon: '💾' },
  { id: 'clear', title: 'クリア', icon: '🗑️' },
];

export const Toolbar: React.FC<ToolbarProps> = ({ onAction }) => {
  return (
    <div className={styles.toolbar}>
      {toolbarButtons.map((button) => (
        <Button
          key={button.id}
          onClick={() => onAction(button.id)}
          title={button.title}
        >
          {button.icon}
        </Button>
      ))}
    </div>
  );
};
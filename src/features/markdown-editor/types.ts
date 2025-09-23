export interface ToolbarButton {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface EditorState {
  markdownText: string;
  selectionStart: number;
  selectionEnd: number;
}

export interface InsertTextOptions {
  selectionStart?: number;
  selectionEnd?: number;
}

export type ToolbarAction =
  | 'bold'
  | 'italic'
  | 'heading'
  | 'link'
  | 'image'
  | 'list'
  | 'code'
  | 'quote'
  | 'horizontalRule'
  | 'save'
  | 'clear';
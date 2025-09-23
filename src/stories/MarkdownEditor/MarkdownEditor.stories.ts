import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor } from '../../features/markdown-editor/MarkdownEditorApp';

const meta: Meta<typeof MarkdownEditor> = {
  title: 'Features/MarkdownEditor',
  component: MarkdownEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
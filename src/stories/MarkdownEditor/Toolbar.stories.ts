import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { Toolbar } from '../../features/markdown-editor/components/Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Features/MarkdownEditor/Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onAction: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
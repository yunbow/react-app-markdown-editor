import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { TextArea } from '../components/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => {},
    onSelectionChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'マークダウンを入力してください...',
  },
};

export const WithContent: Story = {
  args: {
    value: '# Hello World\n\nThis is a **markdown** example.',
    placeholder: 'マークダウンを入力してください...',
  },
};
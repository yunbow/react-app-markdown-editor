import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components/Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'p', 'footer'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'マークダウンエディタ',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'マークダウン',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children: 'これは段落のテキストです。',
  },
};

export const Footer: Story = {
  args: {
    variant: 'footer',
    children: '',
  },
};
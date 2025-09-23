import React from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSelectionChange?: (start: number, end: number) => void;
  placeholder?: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  onSelectionChange,
  placeholder,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (onSelectionChange) {
      onSelectionChange(target.selectionStart, target.selectionEnd);
    }
  };

  return (
    <textarea
      className={`${styles.textarea} ${className || ''}`}
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      placeholder={placeholder}
    />
  );
};
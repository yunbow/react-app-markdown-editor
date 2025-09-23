import React from 'react';
import styles from './Text.module.css';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'p' | 'footer';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'p',
  className,
}) => {
  const Component = variant;

  return (
    <Component className={`${styles[variant]} ${className || ''}`}>
      {children}
    </Component>
  );
};
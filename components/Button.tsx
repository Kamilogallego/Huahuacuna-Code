import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ variant = 'primary', size = 'md', children, className, ...rest }: Props) {
  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.9rem' },
    md: { padding: '1rem 2rem', fontSize: '1rem' },
    lg: { padding: '1.25rem 2.5rem', fontSize: '1.05rem' }
  }[size];

  const variantClass = {
    primary: 'btnPrimary',
    secondary: 'btnSecondary',
    danger: 'btnDanger',
    yellow: 'btnYellow'
  }[variant];

  return (
    <button
      className={['btn', variantClass, className].filter(Boolean).join(' ')}
      style={sizeStyles as React.CSSProperties}
      {...rest}
    >
      {children}
    </button>
  );
}
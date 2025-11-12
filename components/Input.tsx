import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export default function Input({ label, helperText, required, ...rest }: Props) {
  const id = rest.id || rest.name || Math.random().toString(36).slice(2);
  return (
    <div className="inputGroup" style={{ margin: '0.5rem 0' }}>
      {label && <label className="label" htmlFor={id}>{label}{required ? ' *' : ''}</label>}
      <input id={id} className="input" required={required} {...rest} />
      {helperText && <div className="helper">{helperText}</div>}
    </div>
  );
}
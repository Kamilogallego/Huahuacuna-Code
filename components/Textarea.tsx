import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
};

export default function Textarea({ label, helperText, required, ...rest }: Props) {
  const id = rest.id || rest.name || Math.random().toString(36).slice(2);
  return (
    <div className="inputGroup" style={{ margin: '0.5rem 0' }}>
      {label && <label className="label" htmlFor={id}>{label}{required ? ' *' : ''}</label>}
      <textarea id={id} className="textarea" required={required} {...rest} />
      {helperText && <div className="helper">{helperText}</div>}
    </div>
  );
}
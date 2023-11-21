import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

import { Input } from './ui/input';
import { Label } from './ui/label';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function FormField({ name, id, label, ...restInputProps }: InputProps) {
  return (
    <div className="mb-3 flex flex-col items-start">
      <Label htmlFor={id || name}>{label}</Label>
      <Input id={id || name} name={name} {...restInputProps} />
    </div>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function NativeSelect({
  id,
  name,
  label,
  options,
  ...selectProps
}: SelectProps) {
  return (
    <div className="mb-3 flex flex-col items-start">
      <Label htmlFor={id || name}>{label}</Label>
      <select
        id={id || name}
        name={name}
        {...selectProps}
        className="w-full bg-white border border-1 px-3 py-1"
      >
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

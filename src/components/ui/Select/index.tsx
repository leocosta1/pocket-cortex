import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

import { StyledSelect } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string | number }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...rest }, ref) => {
    return (
      <StyledSelect ref={ref} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    );
  }
);

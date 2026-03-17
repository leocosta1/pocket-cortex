import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { StyledButton, type ButtonVariants } from './styles';

import { Spinner } from '../Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariants;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, ...rest }, ref) => {
    const isDisabled = isLoading || rest.disabled;

    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading ? <Spinner variant="neutral" /> : children}
      </StyledButton>
    );
  }
);

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { StyledButton } from './styles';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...rest }, ref) => {
    return (
      <StyledButton ref={ref} {...rest}>
        {icon}
      </StyledButton>
    );
  }
);

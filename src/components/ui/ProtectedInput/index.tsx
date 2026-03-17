import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import { StyledInput } from './styles';

export const ProtectedInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [isProtected, setIsProtected] = useState(true);

  return (
    <StyledInput
      ref={ref}
      readOnly={isProtected}
      onBlur={() => setIsProtected(true)}
      onDoubleClick={(e) => {
        setIsProtected(false);
        e.currentTarget.select();
      }}
      {...props}
    />
  );
});

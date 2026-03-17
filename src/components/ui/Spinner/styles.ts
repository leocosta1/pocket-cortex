import styled, { keyframes } from 'styled-components';
import type { DefaultTheme } from 'styled-components';

export type SpinnerVariant = keyof DefaultTheme['spinner'];

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Ring = styled.div<{ $variant: SpinnerVariant }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  border: 3px solid ${({ $variant, theme }) => theme.spinner[$variant].track};
  border-top-color: ${({ $variant, theme }) =>
    theme.spinner[$variant].indicator};

  animation: ${spin} 0.75s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  will-change: transform;

  pointer-events: none;
  user-select: none;
`;

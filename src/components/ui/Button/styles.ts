import styled from 'styled-components';
import type { DefaultTheme } from 'styled-components/dist/types';

export type ButtonVariants = keyof DefaultTheme['action'];

export const StyledButton = styled.button<{ $variant: ButtonVariants }>`
  background-color: ${({ $variant, theme }) => theme.action[$variant].main};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 14px;
  font-weight: 400;
  color: ${({ $variant, theme }) => theme.action[$variant].text};

  transition: all 0.15s ease-in-out;
  user-select: none;
  outline: none;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: ${({ $variant, theme }) => theme.action[$variant].hover};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & > svg {
    width: 16px;
    height: 16px;
  }
`;

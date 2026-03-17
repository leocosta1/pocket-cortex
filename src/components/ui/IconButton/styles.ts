import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.15s ease-in-out;
  user-select: none;
  outline: none;

  color: ${({ theme }) => theme.text.primary};
  opacity: 1;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: ${({ theme }) => theme.background.surface};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

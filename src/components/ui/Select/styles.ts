import styled from 'styled-components';

export const StyledSelect = styled.select`
  padding: 2px 4px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 4px;
  outline: none;

  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;

  transition: all 0.15s ease-in-out;

  &:disabled {
    opacity: 0.5;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.border.focus};
  }

  & > option {
    background-color: ${({ theme }) => theme.background.surface};
    color: ${({ theme }) => theme.text.primary};
  }
`;

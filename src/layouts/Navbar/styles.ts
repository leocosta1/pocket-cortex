import styled from 'styled-components';

import { NavLink } from 'react-router';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.background.surface};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.25);

  display: flex;
`;

export const Button = styled(NavLink)`
  flex: 1;
  overflow: hidden;

  background-color: transparent;
  border: none;
  outline: none;
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  font-size: clamp(12px, 2.5vw, 16px);
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;

  transition: all 0.15s ease-in-out;
  opacity: 0.5;

  &:hover,
  &:focus-visible,
  &.active {
    opacity: 1;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

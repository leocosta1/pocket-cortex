import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  background-color: ${({ theme }) => theme.background.page};

  margin: 0 auto;

  display: grid;
  grid-template-rows: 1fr auto;
`;

export const Main = styled.main`
  padding: 32px;

  color: ${({ theme }) => theme.text.primary};

  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.border.secondary} transparent;
`;

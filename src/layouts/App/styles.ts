import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.page};

  display: grid;
  grid-template-rows: 1fr auto;
`;

export const Main = styled.main`
  padding: 32px;

  color: ${({ theme }) => theme.text.primary};
`;

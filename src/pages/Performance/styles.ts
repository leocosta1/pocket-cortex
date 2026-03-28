import styled from 'styled-components';

import { Button } from '../../components/ui/Button';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

export const Status = styled.section`
  display: flex;
  flex-direction: column;

  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
`;

export const Sections = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-weight: 400;
  color: ${({ theme }) => theme.text.secondary};

  & .current {
    font-weight: 700;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.border.primary};
  border-radius: 4px;

  margin: 16px 0;
`;

export const Songs = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 24px;
      font-weight: 700;
      color: ${({ theme }) => theme.text.primary};
    }

    div {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
`;

export const Song = styled.div`
  background-color: ${({ theme }) => theme.background.surface};
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
`;

export const Play = styled(Button)`
  padding: 6px 8px;
`;

export const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 8px;

  & > strong {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};
  }

  & > span {
    font-size: 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

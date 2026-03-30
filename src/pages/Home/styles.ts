import styled from 'styled-components';

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
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.border.primary};
  border-radius: 4px;

  margin: 16px 0;
`;

export const Configs = styled.section`
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
  }
`;

export const Config = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > strong {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const Display = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Preset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.text.primary};

  & > span {
    font-size: 30px;
    font-weight: 300;
  }

  & > strong {
    font-size: 36px;
    font-weight: 700;

    margin-top: -16px;
  }
`;

export const Tempo = styled.button`
  background-color: ${({ theme }) => theme.background.surface};
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: flex-start;
  flex-direction: column;

  color: ${({ theme }) => theme.text.primary};
  transition: all 0.15s ease-in-out;
  outline-color: ${({ theme }) => theme.border.focus};

  & > strong {
    font-size: 30px;
    font-weight: 700;
  }

  & > span {
    font-size: 36px;
    font-weight: 300;

    margin-top: -16px;
  }

  &:focus-visible {
    outline-width: 2px;
    outline-style: solid;
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 64px;
  background-color: ${({ theme }) => theme.border.secondary};
  border-radius: 4px;
`;

export const Actions = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

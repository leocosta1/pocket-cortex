import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 32px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 512px;
  max-height: 100%;
  background-color: ${({ theme }) => theme.background.surface};
  padding: 20px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.border.secondary} transparent;

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & input {
    width: 100%;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 4px;
    padding: 2px 8px;

    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text.primary};

    outline: none;
    transition: all 0.15s ease-in-out;

    &:focus-visible {
      border: 1px solid ${({ theme }) => theme.border.focus};
    }
  }
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > label {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const SectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > input:nth-child(3),
  & > input:nth-child(4) {
    width: 36px;
    text-align: center;
  }
`;

export const Drag = styled.span`
  width: 16px;
  color: ${({ theme }) => theme.text.tertiary};

  cursor: grab;

  flex-shrink: 0;
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  color: ${({ theme }) => theme.action.danger.main};

  & > svg {
    width: 16px;
  }
`;

export const AddButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 4px;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  align-self: flex-start;
  margin-left: 24px;
  color: ${({ theme }) => theme.text.primary};

  & > svg {
    width: 16px;
  }
`;

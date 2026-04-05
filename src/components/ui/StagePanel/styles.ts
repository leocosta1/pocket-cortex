import styled from 'styled-components';

export const Container = styled.div<{
  $translate: string;
  $dragging: boolean;
}>`
  width: 100%;
  max-width: 768px;
  padding: 16px 32px 24px;
  background-color: ${({ theme }) => theme.background.surface};

  border-radius: 32px 32px 0 0;
  box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.25);

  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: 16px;

  transform: translate(-50%, ${({ $translate }) => $translate});

  transition: ${({ $dragging }) =>
    $dragging ? 'none' : 'transform 0.25s ease-in-out'};

  will-change: transform;
  touch-action: none;
  user-select: none;
`;

export const Swipe = styled.div`
  width: 100%;
  padding: 8px 0;

  position: relative;
  align-self: center;
  cursor: grab;

  &::after {
    content: '';
    width: 50%;
    height: 3px;
    background-color: ${({ theme }) => theme.border.secondary};
    border-radius: 3px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Sections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  gap: 12px;
`;

export const Button = styled.button<{ $active?: boolean }>`
  padding: 20px 24px;
  border: none;
  border-radius: 12px;
  background: ${({ theme, $active }) =>
    $active ? theme.status.active : theme.status.inactive};

  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Patch = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.text.secondary};
`;

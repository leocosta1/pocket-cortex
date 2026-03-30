import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Figtree', sans-serif;
    font-style: normal;
    font-optical-sizing: auto;

    line-height: 1.5;

    background-color: ${({ theme }) => theme.background.page};
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  svg {
    width: inherit;
    height: inherit;
  }

  a,
  button {
    cursor: pointer;
  }

  input, button, textarea, select {
    font: inherit;
    accent-color: ${({ theme }) => theme.action.primary.main};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type=number] {
    appearance: none;
  }

  ul {
    padding-left: 32px;
  }
`;

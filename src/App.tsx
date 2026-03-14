import { usePreferredTheme } from './hooks/usePreferredTheme';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import { themes } from './themes';

import { GlobalStyles } from './styles/GlobalStyles';

import { RouterProvider } from 'react-router';
import { routes } from './routes';

function App() {
  const theme = usePreferredTheme();

  return (
    <ThemeProvider theme={themes[theme] as DefaultTheme}>
      <GlobalStyles />

      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;

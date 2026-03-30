import { palette } from './palette';

export const dark = {
  background: {
    page: palette.black[400],
    surface: palette.black[300],
    accent: palette.blue[400],
  },
  text: {
    primary: palette.white[400],
    secondary: palette.white[300],
    tertiary: palette.white[200],
    inverse: palette.black[400],
    accent: palette.blue[400],
  },
  border: {
    primary: palette.white[200],
    secondary: palette.white[100],
    focus: palette.blue[400],
    error: palette.red[400],
  },
  action: {
    primary: {
      main: palette.blue[400],
      hover: palette.blue[500],
      text: palette.white[400],
    },
    danger: {
      main: palette.red[400],
      hover: palette.red[500],
      text: palette.white[400],
    },
    neutral: {
      main: palette.white[100],
      hover: palette.white[200],
      text: palette.white[300],
    },
  },
  spinner: {
    primary: {
      track: palette.black[200],
      indicator: palette.blue[400],
    },
    neutral: {
      track: palette.white[200],
      indicator: palette.white[400],
    },
  },
  status: {
    active: palette.green[400],
    inactive: palette.red[400],
  },
} as const;

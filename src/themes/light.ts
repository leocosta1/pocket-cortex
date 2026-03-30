import { palette } from './palette';

export const light = {
  background: {
    page: palette.white[400],
    surface: palette.white[300],
    accent: palette.blue[400],
  },
  text: {
    primary: palette.black[400],
    secondary: palette.black[300],
    tertiary: palette.black[200],
    inverse: palette.white[400],
    accent: palette.blue[400],
  },
  border: {
    primary: palette.black[200],
    secondary: palette.black[100],
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
      main: palette.black[100],
      hover: palette.black[200],
      text: palette.black[300],
    },
  },
  spinner: {
    primary: {
      track: palette.white[200],
      indicator: palette.blue[400],
    },
    neutral: {
      track: palette.black[200],
      indicator: palette.black[400],
    },
  },
  status: {
    active: palette.green[400],
    inactive: palette.red[400],
  },
} as const;

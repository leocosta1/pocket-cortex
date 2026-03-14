import 'styled-components';
import type { themes } from '../themes';

type LightTheme = typeof themes.light;
type DarkTheme = typeof themes.dark;

interface Theme extends LightTheme, DarkTheme {}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

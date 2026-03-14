import type { ElementType } from 'react';

import { HomeIcon } from '../components/icons/HomeIcon';
import { SetlistIcon } from '../components/icons/SetlistIcon';
import { ScenesIcon } from '../components/icons/ScenesIcon';
import { MetronomeIcon } from '../components/icons/MetronomeIcon';

export interface Route {
  label: string;
  path: string;
  icon: ElementType;
}

const routeConfigs: Route[] = [
  {
    label: 'Início',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'Setlist',
    path: 'setlist',
    icon: SetlistIcon,
  },
  {
    label: 'Cenas',
    path: 'scenes',
    icon: ScenesIcon,
  },
  {
    label: 'Metrônomo',
    path: 'metronome',
    icon: MetronomeIcon,
  },
];

export function getRoutes() {
  return routeConfigs;
}

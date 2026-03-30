import type { ElementType } from 'react';

import { HomeIcon } from '../components/icons/HomeIcon';
import { PerformanceIcon } from '../components/icons/PerformanceIcon';
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
    label: 'Performance',
    path: 'performance',
    icon: PerformanceIcon,
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

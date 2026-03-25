import { createHashRouter } from 'react-router';

import { AppLayout } from '../layouts/App';

import { HomePage } from '../pages/Home';
import { PerformancePage } from '../pages/Performance';
import { ScenesPage } from '../pages/Scenes';
import { MetronomePage } from '../pages/Metronome';

export const routes = createHashRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'performance', Component: PerformancePage },
      { path: 'scenes', Component: ScenesPage },
      { path: 'metronome', Component: MetronomePage },
    ],
  },
]);

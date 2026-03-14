import { createBrowserRouter } from 'react-router';

import { AppLayout } from '../layouts/App';

import { HomePage } from '../pages/Home';
import { SetlistPage } from '../pages/Setlist';
import { ScenesPage } from '../pages/Scenes';
import { MetronomePage } from '../pages/Metronome';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'setlist', Component: SetlistPage },
      { path: 'scenes', Component: ScenesPage },
      { path: 'metronome', Component: MetronomePage },
    ],
  },
]);

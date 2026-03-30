import { globalTapTempo } from '../features/globalTapTempo';
import { ctrlDoubleClick } from '../features/ctrlDoubleClick';
import { performanceMode } from '../features/performanceMode';

const appFeatures = [globalTapTempo, ctrlDoubleClick, performanceMode];

let initialized = false;

export function initAppFeatures() {
  if (initialized) return;

  appFeatures.forEach((feature) => feature());

  initialized = true;
}

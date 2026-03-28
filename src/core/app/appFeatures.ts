import { globalTapTempo } from '../features/globalTapTempo';
import { ctrlDoubleClick } from '../features/ctrlDoubleClick';

const appFeatures = [globalTapTempo, ctrlDoubleClick];

let initialized = false;

export function initAppFeatures() {
  if (initialized) return;

  appFeatures.forEach((feature) => feature());

  initialized = true;
}

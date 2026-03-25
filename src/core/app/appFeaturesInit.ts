import { globalTapTempo } from '../features/globalTapTempo';
import { ctrlDoubleClick } from '../features/ctrlDoubleClick';

const appFeatures = [globalTapTempo, ctrlDoubleClick];

export function initAppFeatures() {
  appFeatures.forEach((feature) => feature());
}

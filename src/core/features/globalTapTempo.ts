import { appModeStore } from '../app/appModeStore';
import { appConfigStore } from '../app/appConfigStore';

import { pedalEvents } from '../pedal/pedalEvents';
import { pedalStore } from '../pedal/pedalStore';
import { pedalController } from '../pedal/pedalController';

export function globalTapTempo() {
  pedalEvents.on('presetChange', () => {
    const mode = appModeStore.getMode();

    if (mode !== 'normal') return;

    const { globalTapTempo } = appConfigStore.getConfig();
    const { bpm } = pedalStore.getState();

    if (!globalTapTempo || !bpm) return;

    pedalController.setTempo(bpm);
  });
}

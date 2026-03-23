import { appConfigStore } from '../app/appConfigStore';

import { pedalEvents } from '../pedal/pedalEvents';
import { pedalStore } from '../pedal/pedalStore';
import { pedalController } from '../pedal/pedalController';

export function globalTapTempo() {
  const applyTempo = () => {
    const { globalTapTempo } = appConfigStore.getConfig();
    const { bpm } = pedalStore.getState();

    if (!globalTapTempo || !bpm) return;

    pedalController.setTempo(bpm);
  };

  pedalEvents.on('presetChange', applyTempo);
}

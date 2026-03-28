import { appModeStore } from '../app/appModeStore';

import { pedalEvents } from '../pedal/pedalEvents';
import { performanceController } from '../performance/performanceController';

import { createDoubleClickDetector } from '../../utils/doubleClickDetector';

export function performanceMode() {
  const doubleClickDetector = createDoubleClickDetector();

  pedalEvents.on('ctrlSwitch', ({ ctrl }) => {
    const mode = appModeStore.getMode();

    if (mode !== 'performance') return;

    if (doubleClickDetector(ctrl)) {
      performanceController.setSection(ctrl - 1);
    }
  });
}

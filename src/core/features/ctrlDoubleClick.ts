import { appModeStore } from '../app/appModeStore';
import { appConfigStore } from '../app/appConfigStore';

import { pedalEvents } from '../pedal/pedalEvents';
import { pedalStore } from '../pedal/pedalStore';
import { pedalController } from '../pedal/pedalController';

import { createDoubleClickDetector } from '../../utils/doubleClickDetector';

export function ctrlDoubleClick() {
  const doubleClickDetector = createDoubleClickDetector();

  pedalEvents.on('ctrlSwitch', ({ ctrl }) => {
    const mode = appModeStore.getMode();

    if (mode !== 'normal') return;

    const { ctrlDoubleClickable, ctrlDoubleClickMode } =
      appConfigStore.getConfig();

    if (!ctrlDoubleClickable) return;

    if (doubleClickDetector(ctrl)) {
      const { initialBank } = appConfigStore.getConfig();
      const { bank } = pedalStore.getState();

      if (!initialBank || !bank) return;

      const targetBank =
        ctrlDoubleClickMode === 'absolute' ? initialBank : bank;

      pedalController.selectPreset(targetBank, ctrl);
    }
  });
}

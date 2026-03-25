import { appConfigStore } from '../app/appConfigStore';

import { pedalEvents } from '../pedal/pedalEvents';
import { pedalStore } from '../pedal/pedalStore';
import { pedalController } from '../pedal/pedalController';

const DOUBLE_CLICK_THRESHOLD = 300;

export function ctrlDoubleClick() {
  const lastClick: Record<number, number> = {};

  pedalEvents.on('ctrlSwitch', ({ ctrl }) => {
    const { ctrlDoubleClickable, ctrlDoubleClickMode } =
      appConfigStore.getConfig();

    if (!ctrlDoubleClickable) return;

    const now = Date.now();
    const last = lastClick[ctrl];

    if (last && now - last < DOUBLE_CLICK_THRESHOLD) {
      lastClick[ctrl] = 0;

      const { initialBank } = appConfigStore.getConfig();
      const { bank } = pedalStore.getState();

      if (!initialBank || !bank) return;

      const targetBank =
        ctrlDoubleClickMode === 'absolute' ? initialBank : bank;

      pedalController.selectPreset(targetBank, ctrl);

      return;
    }

    lastClick[ctrl] = now;
  });
}

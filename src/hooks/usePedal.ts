import { useState, useEffect, useMemo } from 'react';

import { pedalStore } from '../core/pedal/pedalStore';
import { pedalController } from '../core/pedal/pedalController';

export function usePedal() {
  const [pedalState, setPedalState] = useState(() => pedalStore.getState());

  useEffect(() => {
    const unsubscribe = pedalStore.subscribe(setPedalState);

    return unsubscribe;
  }, []);

  const pedalActions = useMemo(
    () => ({
      connect: () => pedalController.connect(),
      disconnect: () => pedalController.disconnect(),
      selectPreset: (bank: number, patch: number) =>
        pedalController.selectPreset(bank, patch),
      bankMinus: () => pedalController.bankMinus(),
      bankPlus: () => pedalController.bankPlus(),
      patchMinus: () => pedalController.patchMinus(),
      patchPlus: () => pedalController.patchPlus(),
      setTempo: (bpm: number) => pedalController.setTempo(bpm),
      tapTempo: () => pedalController.tapTempo(),
      metronomeOff: () => pedalController.metronomeOff(),
      metronomeOn: () => pedalController.metronomeOn(),
      ctrl: (ctrl: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => pedalController.ctrl(ctrl),
    }),
    []
  );

  return {
    pedalState,
    pedalActions,
  };
}

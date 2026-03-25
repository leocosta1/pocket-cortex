import { useAppConfig } from '../useAppConfig';
import { usePedalState } from '../usePedalState';
import type { ChangeEvent } from 'react';

import { pedalController } from '../../core/pedal/pedalController';

import { mapPatchLetterToIndex } from '../../utils/patchLetters';

const DEFAULT_TEMPO = 120;

export function useHomePage() {
  const { config, actions } = useAppConfig();
  const pedalState = usePedalState();

  async function connect() {
    const connected = await pedalController.connect();

    if (!connected) return;

    pedalController.selectPreset(config.initialBank, config.initialPatch);
    pedalController.setTempo(DEFAULT_TEMPO);
  }

  function disconnect() {
    pedalController.disconnect();
  }

  function setInitialBank(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.currentTarget.value);

    if (isNaN(value) || value < 1 || value > 64) return;

    actions.setInitialBank(value);
  }

  function setInitialPatch(e: ChangeEvent<HTMLInputElement>) {
    const letter = e.currentTarget.value.toUpperCase();

    if (!/^[ABCD]$/.test(letter)) return;

    const patchIndex = mapPatchLetterToIndex(letter);

    actions.setInitialPatch(patchIndex);
  }

  function setGlobalTapTempo(e: ChangeEvent<HTMLInputElement>) {
    actions.setGlobalTapTempo(e.currentTarget.checked);
  }

  function setCtrlDoubleClickable(e: ChangeEvent<HTMLInputElement>) {
    actions.setCtrlDoubleClickable(e.currentTarget.checked);
  }

  function setCtrlDoubleClickMode(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;

    if (value !== 'absolute' && value !== 'relative') return;

    actions.setCtrlDoubleClickMode(value);
  }

  function tapTempo() {
    pedalController.tapTempo();
  }

  function bankMinus() {
    pedalController.bankMinus();
  }

  function bankPlus() {
    pedalController.bankPlus();
  }

  function patchMinus() {
    pedalController.patchMinus();
  }

  function patchPlus() {
    pedalController.patchPlus();
  }

  function selectPatch(letter: 'A' | 'B' | 'C' | 'D') {
    const patchIndex = mapPatchLetterToIndex(letter);

    if (!pedalState.bank) return;

    pedalController.selectPreset(pedalState.bank, patchIndex);
  }

  function ctrl(ctrl: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) {
    pedalController.ctrl(ctrl);
  }

  return {
    pedalState,
    appConfig: config,
    actions: {
      connect,
      disconnect,
      setInitialBank,
      setInitialPatch,
      setGlobalTapTempo,
      setCtrlDoubleClickable,
      setCtrlDoubleClickMode,
      tapTempo,
      bankMinus,
      bankPlus,
      patchMinus,
      patchPlus,
      selectPatch,
      ctrl,
    },
  };
}

import { useApp } from '../useApp';
import { usePedal } from '../usePedal';

import { mapPatchLetterToIndex } from '../../utils/patchLetters';
import { wakeLockHandler } from '../../utils/wakeLock';

import type { ChangeEvent } from 'react';

const DEFAULT_TEMPO = 120;

export function useHomePage() {
  const { appConfig, appActions } = useApp();
  const { pedalState, pedalActions } = usePedal();

  async function connect() {
    const connected = await pedalActions.connect();

    if (!connected) return;

    await wakeLockHandler.request();

    pedalActions.selectPreset(appConfig.initialBank, appConfig.initialPatch);
    pedalActions.setTempo(DEFAULT_TEMPO);
  }

  async function disconnect() {
    pedalActions.disconnect();
    await wakeLockHandler.release();
  }

  function saveConfig() {
    appActions.saveConfig();
  }

  function setInitialBank(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.currentTarget.value);

    if (isNaN(value) || value < 1 || value > 64) return;

    appActions.setInitialBank(value);
  }

  function setInitialPatch(e: ChangeEvent<HTMLInputElement>) {
    const letter = e.currentTarget.value.toUpperCase();

    if (!/^[ABCD]$/.test(letter)) return;

    const patchIndex = mapPatchLetterToIndex(letter);

    appActions.setInitialPatch(patchIndex);
  }

  function setGlobalTapTempo(e: ChangeEvent<HTMLInputElement>) {
    appActions.setGlobalTapTempo(e.currentTarget.checked);
  }

  function setCtrlDoubleClickable(e: ChangeEvent<HTMLInputElement>) {
    appActions.setCtrlDoubleClickable(e.currentTarget.checked);
  }

  function setCtrlDoubleClickMode(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;

    if (value !== 'absolute' && value !== 'relative') return;

    appActions.setCtrlDoubleClickMode(value);
  }

  function tapTempo() {
    pedalActions.tapTempo();
  }

  function bankMinus() {
    pedalActions.bankMinus();
  }

  function bankPlus() {
    pedalActions.bankPlus();
  }

  function patchMinus() {
    pedalActions.patchMinus();
  }

  function patchPlus() {
    pedalActions.patchPlus();
  }

  function selectPatch(letter: 'A' | 'B' | 'C' | 'D') {
    const patchIndex = mapPatchLetterToIndex(letter);

    if (!pedalState.bank) return;

    pedalActions.selectPreset(pedalState.bank, patchIndex);
  }

  function ctrl(ctrl: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) {
    pedalActions.ctrl(ctrl);
  }

  return {
    pedalState,
    appConfig,
    actions: {
      connect,
      disconnect,
      saveConfig,
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

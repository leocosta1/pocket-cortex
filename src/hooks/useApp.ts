import { useState, useEffect, useMemo } from 'react';

import { appModeStore } from '../core/app/appModeStore';
import { appConfigStore } from '../core/app/appConfigStore';

export function useApp() {
  const [appMode, setAppMode] = useState(() => appModeStore.getMode());
  const [appConfig, setAppConfig] = useState(() => appConfigStore.getConfig());

  useEffect(() => {
    const unsubscribeMode = appModeStore.subscribe(setAppMode);
    const unsubscribeConfig = appConfigStore.subscribe(setAppConfig);

    return () => {
      unsubscribeMode();
      unsubscribeConfig();
    };
  }, []);

  const appActions = useMemo(
    () => ({
      setMode: (mode: 'normal' | 'performance') => appModeStore.setMode(mode),
      saveConfig: () => appConfigStore.saveConfig(),
      setInitialBank: (bank: number) => appConfigStore.setInitialBank(bank),
      setInitialPatch: (patch: number) => appConfigStore.setInitialPatch(patch),
      setGlobalTapTempo: (isGlobal: boolean) =>
        appConfigStore.setGlobalTapTempo(isGlobal),
      setCtrlDoubleClickable: (isDoubleClickable: boolean) =>
        appConfigStore.setCtrlDoubleClickable(isDoubleClickable),
      setCtrlDoubleClickMode: (mode: 'absolute' | 'relative') =>
        appConfigStore.setCtrlDoubleClickMode(mode),
    }),
    []
  );

  return {
    appMode,
    appConfig,
    appActions,
  };
}

import { useState, useEffect } from 'react';

import { appConfigStore } from '../core/app/appConfigStore';

export function useAppConfig() {
  const [config, setConfig] = useState(appConfigStore.getConfig());

  useEffect(() => {
    const unsubscribe = appConfigStore.subscribe(setConfig);

    return unsubscribe;
  }, []);

  return {
    config,
    actions: {
      setInitialBank: appConfigStore.setInitialBank.bind(appConfigStore),
      setInitialPatch: appConfigStore.setInitialPatch.bind(appConfigStore),
      setGlobalTapTempo: appConfigStore.setGlobalTapTempo.bind(appConfigStore),
      setCtrlDoubleClickable:
        appConfigStore.setCtrlDoubleClickable.bind(appConfigStore),
      setCtrlDoubleClickMode:
        appConfigStore.setCtrlDoubleClickMode.bind(appConfigStore),
    },
  };
}

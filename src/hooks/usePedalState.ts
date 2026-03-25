import { useState, useEffect } from 'react';

import { pedalStore } from '../core/pedal/pedalStore';

export function usePedalState() {
  const [state, setState] = useState(pedalStore.getState());

  useEffect(() => {
    const unsubscribe = pedalStore.subscribe(setState);

    return unsubscribe;
  }, []);

  return state;
}

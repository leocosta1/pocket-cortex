type ConnectionChangeData = {
  connected: boolean;
};

type PresetChangeData = {
  bank: number;
  patch: number;
};

type CtrlSwitchData = {
  ctrl: number;
  active: boolean;
};

type TapTempoData = {
  bpm: number;
};

type PedalEventMap = {
  connectionChange: ConnectionChangeData;
  presetChange: PresetChangeData;
  ctrlSwitch: CtrlSwitchData;
  tapTempo: TapTempoData;
};

type EventName = keyof PedalEventMap;

type Listener<K extends EventName> = (data: PedalEventMap[K]) => void;

type ListenersMap = {
  [K in EventName]?: Listener<K>[];
};

class PedalEvents {
  private listeners: ListenersMap = {};

  on<K extends EventName>(event: K, listener: Listener<K>) {
    const list = this.listeners[event] ?? [];

    this.listeners[event] = [...list, listener] as ListenersMap[K];

    return () => {
      const current = this.listeners[event];

      if (!current) return;

      this.listeners[event] = current.filter(
        (l) => l !== listener
      ) as ListenersMap[K];
    };
  }

  emit<K extends EventName>(event: K, data: PedalEventMap[K]) {
    const list = this.listeners[event];

    if (!list) return;

    list.forEach((listener) => listener(data));
  }
}

export const pedalEvents = new PedalEvents();

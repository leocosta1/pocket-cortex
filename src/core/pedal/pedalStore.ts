import { pedalEvents } from './pedalEvents';

type PedalState = {
  connected: boolean;
  bank: number | null;
  patch: number | null;
  bpm: number | null;
};

type Listener = (state: PedalState) => void;

class PedalStore {
  private state: PedalState;
  private listeners: Listener[];

  constructor() {
    this.state = {
      connected: false,
      bank: null,
      patch: null,
      bpm: null,
    };

    this.listeners = [];

    this.bindEvents();
  }

  private bindEvents() {
    pedalEvents.on('connectionChange', ({ connected }) => {
      if (!connected) {
        this.setState({ connected, bank: null, patch: null, bpm: null });
      } else {
        this.setState({ connected });
      }
    });

    pedalEvents.on('presetChange', ({ bank, patch }) => {
      this.setState({ bank, patch });
    });

    pedalEvents.on('tapTempo', ({ bpm }) => {
      this.setState({ bpm });
    });
  }

  private setState(newState: Partial<PedalState>) {
    this.state = { ...this.state, ...newState };

    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    listener(this.state);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const pedalStore = new PedalStore();

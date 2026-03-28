type AppMode = 'normal' | 'performance';

type Listener = (mode: AppMode) => void;

class AppModeStore {
  private mode: AppMode;
  private listeners: Listener[];

  constructor() {
    this.mode = 'normal';
    this.listeners = [];
  }

  getMode() {
    return this.mode;
  }

  setMode(newMode: AppMode) {
    if (this.mode === newMode) return;

    this.mode = newMode;

    this.listeners.forEach((listener) => listener(this.mode));
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    listener(this.mode);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const appModeStore = new AppModeStore();

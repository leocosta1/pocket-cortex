type AppConfig = {
  initialBank: number;
  initialPatch: number;
  globalTapTempo: boolean;
  ctrlDoubleClickable: boolean;
  ctrlDoubleClickMode: 'absolute' | 'relative';
};

type Listener = (config: AppConfig) => void;

const STORAGE_KEY = 'pocket-cortex:configs';

class AppConfigStore {
  private config: AppConfig;
  private listeners: Listener[] = [];

  private defaultConfig(): AppConfig {
    return {
      initialBank: 1,
      initialPatch: 1,
      globalTapTempo: true,
      ctrlDoubleClickable: true,
      ctrlDoubleClickMode: 'relative',
    };
  }

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) return this.defaultConfig();

      return { ...this.defaultConfig(), ...JSON.parse(raw) };
    } catch {
      return this.defaultConfig();
    }
  }

  getConfig() {
    return this.config;
  }

  private saveConfig() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
  }

  private setConfig(newConfig: Partial<AppConfig>) {
    this.config = { ...this.config, ...newConfig };

    this.saveConfig();

    this.listeners.forEach((listener) => listener(this.config));
  }

  setInitialBank(bank: AppConfig['initialBank']) {
    this.setConfig({ initialBank: bank });
  }

  setInitialPatch(patch: AppConfig['initialPatch']) {
    this.setConfig({ initialPatch: patch });
  }

  setGlobalTapTempo(isGlobal: AppConfig['globalTapTempo']) {
    this.setConfig({ globalTapTempo: isGlobal });
  }

  setCtrlDoubleClickable(isDoubleClickable: AppConfig['ctrlDoubleClickable']) {
    this.setConfig({ ctrlDoubleClickable: isDoubleClickable });
  }

  setCtrlDoubleClickMode(mode: AppConfig['ctrlDoubleClickMode']) {
    this.setConfig({ ctrlDoubleClickMode: mode });
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    listener(this.config);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const appConfigStore = new AppConfigStore();

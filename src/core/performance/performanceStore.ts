import type { Song } from './songStore';

type PerformanceState = {
  playing: boolean;
  currentSong: Song | null;
  currentSectionIndex: number;
};

type Listener = (state: PerformanceState) => void;

class PerformanceStore {
  private state: PerformanceState;
  private listeners: Listener[];

  constructor() {
    this.state = {
      playing: false,
      currentSong: null,
      currentSectionIndex: 0,
    };

    this.listeners = [];
  }

  private setState(newState: Partial<PerformanceState>) {
    this.state = { ...this.state, ...newState };

    this.listeners.forEach((l) => l(this.state));
  }

  getState() {
    return this.state;
  }

  play(song: Song) {
    this.setState({
      playing: true,
      currentSong: song,
      currentSectionIndex: 0,
    });
  }

  stop() {
    this.setState({
      playing: false,
      currentSong: null,
      currentSectionIndex: 0,
    });
  }

  setSection(index: number) {
    const { currentSong } = this.state;

    if (!currentSong) return;

    if (index < 0 || index >= currentSong.sections.length) return;

    this.setState({ currentSectionIndex: index });
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    listener(this.state);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const performanceStore = new PerformanceStore();

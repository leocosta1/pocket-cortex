export type Song = {
  id: string;
  name: string;
  bpm: number;
  sections: {
    name: string;
    bank: number;
    patch: number;
  }[];
};

type Listener = (songs: Song[]) => void;

const STORAGE_KEY = 'pocket-cortex:songs';

class SongStore {
  private songs: Song[];
  private listeners: Listener[];

  constructor() {
    this.songs = this.loadSongs();
    this.listeners = [];
  }

  private loadSongs(): Song[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) return [];

      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private saveSongs() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.songs));
  }

  getSongs() {
    return this.songs;
  }

  addSong(song: Song) {
    this.songs = [...this.songs, song];

    this.saveSongs();

    this.listeners.forEach((l) => l(this.songs));
  }

  updateSong(updated: Song) {
    this.songs = this.songs.map((song) =>
      song.id === updated.id ? updated : song
    );

    this.saveSongs();

    this.listeners.forEach((l) => l(this.songs));
  }

  deleteSong(id: string) {
    this.songs = this.songs.filter((song) => song.id !== id);

    this.saveSongs();

    this.listeners.forEach((l) => l(this.songs));
  }

  exportSongs() {
    const data = JSON.stringify(this.songs);

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'songs.json';
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  importSongs(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result;

        if (typeof text !== 'string') throw new Error('Invalid file');

        const importedSongs = JSON.parse(text) as Song[];

        const existingIds = new Set(this.songs.map((song) => song.id));

        const dedupedImportedSongs = importedSongs.filter((song) => {
          if (existingIds.has(song.id)) return false;

          existingIds.add(song.id);
          return true;
        });

        this.songs = [...this.songs, ...dedupedImportedSongs];
        this.saveSongs();

        this.listeners.forEach((l) => l(this.songs));
      } catch {
        throw new Error('Invalid file');
      }
    };

    reader.readAsText(file);
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    listener(this.songs);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const songStore = new SongStore();

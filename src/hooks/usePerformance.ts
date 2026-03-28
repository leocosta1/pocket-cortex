import { useState, useEffect, useMemo } from 'react';

import { performanceStore } from '../core/performance/performanceStore';
import { performanceController } from '../core/performance/performanceController';
import { songStore, type Song } from '../core/performance/songStore';

export function usePerformance() {
  const [performanceState, setPerformanceState] = useState(() =>
    performanceStore.getState()
  );
  const [songs, setSongs] = useState(() =>
    [...songStore.getSongs()].sort((a, b) => a.name.localeCompare(b.name))
  );

  useEffect(() => {
    const unsubscribePerformance =
      performanceStore.subscribe(setPerformanceState);

    const unsubscribeSongs = songStore.subscribe((songs) => {
      setSongs([...songs].sort((a, b) => a.name.localeCompare(b.name)));
    });

    return () => {
      unsubscribePerformance();
      unsubscribeSongs();
    };
  }, []);

  const performanceActions = useMemo(
    () => ({
      play: (song: Song) => performanceController.play(song),
      stop: () => performanceController.stop(),
      setSection: (index: number) => performanceController.setSection(index),
    }),
    []
  );

  const songActions = useMemo(
    () => ({
      addSong: (song: Song) => songStore.addSong(song),
      updateSong: (updated: Song) => songStore.updateSong(updated),
      deleteSong: (id: string) => songStore.deleteSong(id),
      exportSongs: () => songStore.exportSongs(),
      importSongs: (file: File) => songStore.importSongs(file),
    }),
    []
  );

  return {
    performanceState,
    songs,
    performanceActions,
    songActions,
  };
}

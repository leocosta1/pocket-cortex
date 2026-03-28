import { usePerformance } from '../usePerformance';
import type { Song } from '../../core/performance/songStore';

export function usePerformancePage() {
  const { performanceState, performanceActions, songs, songActions } =
    usePerformance();

  function play(song: Song) {
    if (performanceState.playing) {
      performanceActions.stop();
    }

    performanceActions.play(song);
  }

  function stop() {
    performanceActions.stop();
  }

  function createSong(song: Omit<Song, 'id'>) {
    const newSong: Song = {
      ...song,
      id: crypto.randomUUID(),
    };

    songActions.addSong(newSong);
  }

  function updateSong(song: Song) {
    if (performanceState.currentSong?.id === song.id) {
      alert(
        'Não é possível atualizar uma música que está sendo tocada. Pare a performance primeiro.'
      );
      return;
    }

    songActions.updateSong(song);
  }

  function deleteSong(id: string) {
    if (performanceState.currentSong?.id === id) {
      alert(
        'Não é possível deletar uma música que está sendo tocada. Pare a performance primeiro.'
      );
      return;
    }

    songActions.deleteSong(id);
  }

  function exportSongs() {
    songActions.exportSongs();
  }

  function importSongs(file: File) {
    if (performanceState.playing) {
      alert(
        'Não é possível importar enquanto há uma música sendo tocada. Pare a performance primeiro.'
      );
      return;
    }

    try {
      songActions.importSongs(file);
    } catch {
      alert('Erro ao importar músicas. Verifique se o arquivo é válido.');
    }
  }

  return {
    songs,
    performanceState,
    actions: {
      play,
      stop,
      createSong,
      updateSong,
      deleteSong,
      exportSongs,
      importSongs,
    },
  };
}

import { useState } from 'react';
import { usePedal } from '../usePedal';
import { usePerformance } from '../usePerformance';
import type { Song } from '../../core/performance/songStore';

export function usePerformancePage() {
  const { pedalState } = usePedal();
  const { performanceState, performanceActions, songs, songActions } =
    usePerformance();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [songToEdit, setSongToEdit] = useState<Song | null>(null);

  function play(song: Song) {
    if (!pedalState.connected) {
      alert(
        'Pedal não conectado. Conecte o pedal para ativar o modo performance.'
      );
      return;
    }

    if (performanceState.playing) {
      performanceActions.stop();
    }

    performanceActions.play(song);
  }

  function stop() {
    performanceActions.stop();
  }

  function isPlayingCurrentSong(song: Song) {
    return (
      performanceState.playing && performanceState.currentSong?.id === song.id
    );
  }

  function addSong(song: Omit<Song, 'id'>) {
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

    if (confirm('Tem certeza que deseja deletar essa música?')) {
      songActions.deleteSong(id);
    }
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

  const editorActions = {
    openEditorToAdd() {
      setSongToEdit(null);
      setIsEditorOpen(true);
    },

    openEditorToEdit(song: Song) {
      setSongToEdit(song);
      setIsEditorOpen(true);
    },

    handleEditorSubmit(song: Omit<Song, 'id'>) {
      if (songToEdit) {
        updateSong({ ...song, id: songToEdit.id });
      } else {
        addSong(song);
      }

      setIsEditorOpen(false);
      setSongToEdit(null);
    },

    handleEditorClose() {
      setIsEditorOpen(false);
      setSongToEdit(null);
    },
  };

  return {
    songs,
    performanceState,
    editor: {
      isEditorOpen,
      songToEdit,
      actions: editorActions,
    },
    actions: {
      play,
      stop,
      isPlayingCurrentSong,
      addSong,
      updateSong,
      deleteSong,
      exportSongs,
      importSongs,
    },
  };
}

import { appModeStore } from '../app/appModeStore';

import { pedalController } from '../pedal/pedalController';

import { performanceStore } from './performanceStore';
import type { Song } from './songStore';

class PerformanceController {
  play(song: Song) {
    appModeStore.setMode('performance');

    performanceStore.play(song);

    const section = song.sections[0];

    if (section) {
      pedalController.selectPreset(section.bank, section.patch);
    }

    pedalController.setTempo(song.bpm);
  }

  stop() {
    appModeStore.setMode('normal');

    performanceStore.stop();
  }

  setSection(index: number) {
    const { playing, currentSong } = performanceStore.getState();

    if (!playing || !currentSong) return;

    const section = currentSong.sections[index];

    if (!section) return;

    performanceStore.setSection(index);

    pedalController.selectPreset(section.bank, section.patch);

    pedalController.setTempo(currentSong.bpm);
  }
}

export const performanceController = new PerformanceController();

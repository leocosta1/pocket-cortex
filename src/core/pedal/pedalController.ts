import { midiGateway } from '../midi/midiGateway';
import { MIDI_COMMANDS } from '../midi/midiCommands';

import { pedalEvents } from './pedalEvents';

import { parseSysexMessage } from '../sysex/sysexParser';

class PedalController {
  async connect() {
    const connected = await midiGateway.connect();

    pedalEvents.emit('connectionChange', { connected });

    midiGateway.setMessageHandler((message) => {
      const parsed = parseSysexMessage(message);

      if (parsed.type === 'unknown') return;

      pedalEvents.emit(parsed.type, parsed.payload);
    });

    return connected;
  }

  disconnect() {
    midiGateway.disconnect();

    pedalEvents.emit('connectionChange', { connected: false });
  }

  selectPreset(bank: number, patch: number) {
    const msb = (bank - 1) >> 5;

    midiGateway.sendCC(MIDI_COMMANDS.BANK_MSB, msb);

    const program = ((bank - 1) & 0x1f) * 4 + (patch - 1);

    midiGateway.sendPC(program);
  }

  bankMinus() {
    midiGateway.sendCC(MIDI_COMMANDS.BANK_MINUS, 127);
  }

  bankPlus() {
    midiGateway.sendCC(MIDI_COMMANDS.BANK_PLUS, 127);
  }

  patchMinus() {
    midiGateway.sendCC(MIDI_COMMANDS.PATCH_MINUS, 127);
  }

  patchPlus() {
    midiGateway.sendCC(MIDI_COMMANDS.PATCH_PLUS, 127);
  }

  setTempo(bpm: number) {
    const msb = (bpm >> 7) & 1;

    midiGateway.sendCC(MIDI_COMMANDS.TEMPO_MSB, msb);

    const value = bpm & 0x7f;

    midiGateway.sendCC(MIDI_COMMANDS.SET_TEMPO, value);
  }

  tapTempo() {
    midiGateway.sendCC(MIDI_COMMANDS.TAP_TEMPO, 127);
  }

  metronomeOff() {
    midiGateway.sendCC(MIDI_COMMANDS.METRONOME_TOGGLE, 0);
  }

  metronomeOn() {
    midiGateway.sendCC(MIDI_COMMANDS.METRONOME_TOGGLE, 127);
  }

  ctrl(ctrl: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) {
    const cc = MIDI_COMMANDS.CTRL[ctrl];

    if (!cc) return;

    midiGateway.sendCC(cc, 127);
  }
}

export const pedalController = new PedalController();

type ParsedMessage =
  | { type: 'presetChange'; payload: { bank: number; patch: number } }
  | { type: 'ctrlSwitch'; payload: { ctrl: number; active: boolean } }
  | { type: 'tapTempo'; payload: { bpm: number } }
  | { type: 'unknown' };

export function parseSysexMessage(data: number[]): ParsedMessage {
  // Only SysEx messages
  if (data[0] !== 0xf0 || data[data.length - 1] !== 0xf7) {
    return { type: 'unknown' };
  }

  // ------------------------
  // PRESET CHANGE
  // ------------------------
  if (
    data[8] === 0x12 &&
    data[9] === 0x08 &&
    data[14] === 0x08 &&
    data[15] === 0x01 &&
    data[18] === 0x04
  ) {
    const bankHex = data[25];
    const patchHex = data[26];

    const bank = ((bankHex << 2) | (patchHex >> 2)) + 1;
    const patch = (patchHex & 3) + 1;

    return { type: 'presetChange', payload: { bank, patch } };
  }

  // ------------------------
  // CTRL SWITCH
  // ------------------------
  if (
    data[8] === 0x12 &&
    data[9] === 0x0c &&
    data[14] === 0x0f &&
    data[18] === 0x08
  ) {
    const ctrlHex = data[22];
    const inactiveHex = data[24];

    const ctrl = ctrlHex + 1;
    const active = !inactiveHex;

    return { type: 'ctrlSwitch', payload: { ctrl, active } };
  }

  // ------------------------
  // TAP TEMPO
  // ------------------------
  if (
    data[8] === 0x12 &&
    data[9] === 0x08 &&
    data[14] === 0x06 &&
    data[18] === 0x04 &&
    data[22] === 0x01
  ) {
    const bpmHex = [data[25], data[26]];
    const bpm = (bpmHex[0] << 4) | bpmHex[1];

    return { type: 'tapTempo', payload: { bpm } };
  }

  return { type: 'unknown' };
}

class MIDIGateway {
  private midiOutput: MIDIOutput | null = null;
  private midiInput: MIDIInput | null = null;

  private onMessage?: (data: number[]) => void;

  async connect() {
    if (this.midiInput && this.midiOutput) return true;

    const midi = await navigator.requestMIDIAccess({ sysex: true });

    const outputs = Array.from(midi.outputs.values());
    const inputs = Array.from(midi.inputs.values());

    this.midiOutput =
      outputs.find((output) => output.name?.includes('GP-200')) ?? null;

    this.midiInput =
      inputs.find((input) => input.name?.includes('GP-200')) ?? null;

    if (this.midiInput) {
      this.midiInput.onmidimessage = (event) => {
        const data = Array.from(event.data || []);

        this.onMessage?.(data);
      };
    }

    return !!this.midiInput && !!this.midiOutput;
  }

  disconnect() {
    if (this.midiInput) {
      this.midiInput.onmidimessage = null;
    }

    this.midiInput = null;
    this.midiOutput = null;
  }

  sendCC(cc: number, value: number) {
    if (!this.midiOutput) return;

    this.midiOutput.send([0xb0, cc, value]);
  }

  sendPC(program: number) {
    if (!this.midiOutput) return;

    this.midiOutput.send([0xc0, program]);
  }

  setMessageHandler(handler: (data: number[]) => void) {
    this.onMessage = handler;
  }
}

export const midiGateway = new MIDIGateway();

import { NoiseColor } from "@/types";

let audioContext: AudioContext | null = null;
let leftOsc: OscillatorNode | null = null;
let rightOsc: OscillatorNode | null = null;
let noiseSource: AudioBufferSourceNode | null = null;
let masterGain: GainNode | null = null;
let oscGain: GainNode | null = null;
let noiseGain: GainNode | null = null;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function generateNoiseBuffer(ctx: AudioContext, color: NoiseColor): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 4; // 4-second looping buffer
  const buffer = ctx.createBuffer(2, length, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);

    if (color === "White") {
      for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (color === "Pink") {
      // Voss-McCartney algorithm approximation
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        data[i] = pink * 0.11;
      }
    } else {
      // Brown noise: integrated white noise
      let last = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
    }
  }

  return buffer;
}

export interface PlaybackState {
  playing: boolean;
  carrierHz: number;
  beatHz: number;
  noiseColor: NoiseColor | null;
  volume: number;
  noiseVolume: number;
}

export function startBinaural(
  carrierHz: number,
  beatHz: number,
  noiseColor: NoiseColor | null,
  volume: number,
  noiseVolume: number
) {
  stopBinaural();

  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();

  // Master gain
  masterGain = ctx.createGain();
  masterGain.gain.value = volume;
  masterGain.connect(ctx.destination);

  // Binaural oscillators
  oscGain = ctx.createGain();
  oscGain.gain.value = 0.35;
  oscGain.connect(masterGain);

  const merger = ctx.createChannelMerger(2);
  merger.connect(oscGain);

  // Left ear: carrier frequency
  leftOsc = ctx.createOscillator();
  leftOsc.type = "sine";
  leftOsc.frequency.value = carrierHz;
  const leftGain = ctx.createGain();
  leftGain.gain.value = 1;
  leftOsc.connect(leftGain);
  leftGain.connect(merger, 0, 0);

  // Right ear: carrier + beat frequency
  rightOsc = ctx.createOscillator();
  rightOsc.type = "sine";
  rightOsc.frequency.value = carrierHz + beatHz;
  const rightGainNode = ctx.createGain();
  rightGainNode.gain.value = 1;
  rightOsc.connect(rightGainNode);
  rightGainNode.connect(merger, 0, 1);

  leftOsc.start();
  rightOsc.start();

  // Noise layer
  if (noiseColor) {
    noiseGain = ctx.createGain();
    noiseGain.gain.value = noiseVolume;
    noiseGain.connect(masterGain);

    const buffer = generateNoiseBuffer(ctx, noiseColor);
    noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    noiseSource.connect(noiseGain);
    noiseSource.start();
  }
}

export function stopBinaural() {
  try { leftOsc?.stop(); } catch { /* already stopped */ }
  try { rightOsc?.stop(); } catch { /* already stopped */ }
  try { noiseSource?.stop(); } catch { /* already stopped */ }
  leftOsc?.disconnect();
  rightOsc?.disconnect();
  noiseSource?.disconnect();
  oscGain?.disconnect();
  noiseGain?.disconnect();
  masterGain?.disconnect();
  leftOsc = null;
  rightOsc = null;
  noiseSource = null;
  oscGain = null;
  noiseGain = null;
  masterGain = null;
}

export function setVolume(vol: number) {
  if (masterGain) masterGain.gain.value = vol;
}

export function setNoiseVolume(vol: number) {
  if (noiseGain) noiseGain.gain.value = vol;
}

export function isPlaying(): boolean {
  return leftOsc !== null;
}

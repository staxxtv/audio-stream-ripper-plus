import { Note, Pcset } from 'tonal';

/**
 * Attempt to detect the musical key from an AudioBuffer using
 * chroma-based pitch class analysis via FFT.
 */
export function detectKey(audioBuffer: AudioBuffer): string {
  const sampleRate = audioBuffer.sampleRate;
  const rawData = audioBuffer.getChannelData(0);

  // Take a representative chunk (up to 30s from the middle)
  const maxSamples = sampleRate * 30;
  const start = Math.max(0, Math.floor((rawData.length - maxSamples) / 2));
  const end = Math.min(rawData.length, start + maxSamples);
  const data = rawData.slice(start, end);

  // Simple chroma feature extraction using zero-crossing and energy
  const chromaCounts = new Float32Array(12); // C, C#, D, ... B
  const fftSize = 4096;
  const hopSize = 2048;

  for (let offset = 0; offset + fftSize < data.length; offset += hopSize) {
    const frame = data.slice(offset, offset + fftSize);
    
    // Apply Hanning window
    const windowed = new Float32Array(fftSize);
    for (let i = 0; i < fftSize; i++) {
      windowed[i] = frame[i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / fftSize));
    }

    // Simple autocorrelation-based pitch detection
    const correlations: number[] = [];
    for (let lag = Math.floor(sampleRate / 2000); lag < Math.floor(sampleRate / 50); lag++) {
      let sum = 0;
      for (let i = 0; i < fftSize - lag; i++) {
        sum += windowed[i] * windowed[i + lag];
      }
      correlations.push(sum);
    }

    const maxCorr = Math.max(...correlations);
    if (maxCorr > 0.01) {
      const bestLag = correlations.indexOf(maxCorr) + Math.floor(sampleRate / 2000);
      const freq = sampleRate / bestLag;
      
      if (freq >= 50 && freq <= 2000) {
        const midiNote = 12 * Math.log2(freq / 440) + 69;
        const pitchClass = Math.round(midiNote) % 12;
        if (pitchClass >= 0 && pitchClass < 12) {
          chromaCounts[pitchClass] += maxCorr;
        }
      }
    }
  }

  // Normalize
  const maxChroma = Math.max(...chromaCounts);
  if (maxChroma === 0) return 'Unknown';
  const normalized = chromaCounts.map((v) => v / maxChroma);

  // Krumhansl-Kessler key profiles
  const majorProfile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
  const minorProfile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  let bestKey = 'C Major';
  let bestCorrelation = -Infinity;

  for (let shift = 0; shift < 12; shift++) {
    // Rotate chroma to compare with profile
    const rotated = new Float32Array(12);
    for (let i = 0; i < 12; i++) {
      rotated[i] = normalized[(i + shift) % 12];
    }

    // Pearson correlation with major profile
    const majorCorr = pearsonCorrelation(Array.from(rotated), majorProfile);
    if (majorCorr > bestCorrelation) {
      bestCorrelation = majorCorr;
      bestKey = `${noteNames[shift]} Major`;
    }

    // Pearson correlation with minor profile
    const minorCorr = pearsonCorrelation(Array.from(rotated), minorProfile);
    if (minorCorr > bestCorrelation) {
      bestCorrelation = minorCorr;
      bestKey = `${noteNames[shift]} Minor`;
    }
  }

  return bestKey;
}

function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let denomX = 0;
  let denomY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }

  const denom = Math.sqrt(denomX * denomY);
  return denom === 0 ? 0 : num / denom;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatSampleRate(rate: number): string {
  return `${(rate / 1000).toFixed(1)} kHz`;
}

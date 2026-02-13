/**
 * Attempt to detect the musical key from an AudioBuffer using
 * FFT-based spectral chroma extraction with Krumhansl-Kessler profiles.
 */
export function detectKey(audioBuffer: AudioBuffer): string {
  const sampleRate = audioBuffer.sampleRate;
  const rawData = audioBuffer.getChannelData(0);

  // Mix down to mono if stereo, take up to 30s from the middle
  const maxSamples = sampleRate * 30;
  const start = Math.max(0, Math.floor((rawData.length - maxSamples) / 2));
  const end = Math.min(rawData.length, start + maxSamples);
  const data = rawData.slice(start, end);

  const chromaCounts = new Float64Array(12); // C, C#, D, ... B
  const fftSize = 8192; // larger FFT for better frequency resolution
  const hopSize = 4096;

  // Precompute frequency-to-chroma mapping for each FFT bin
  const binChroma = new Int8Array(fftSize / 2);
  const binFreqs = new Float64Array(fftSize / 2);
  for (let k = 0; k < fftSize / 2; k++) {
    const freq = (k * sampleRate) / fftSize;
    binFreqs[k] = freq;
    if (freq >= 60 && freq <= 4200) {
      const midiNote = 12 * Math.log2(freq / 440) + 69;
      const pc = ((Math.round(midiNote) % 12) + 12) % 12;
      binChroma[k] = pc;
    } else {
      binChroma[k] = -1; // out of range
    }
  }

  for (let offset = 0; offset + fftSize <= data.length; offset += hopSize) {
    // Apply Hanning window and compute DFT magnitude spectrum
    const real = new Float64Array(fftSize);
    const imag = new Float64Array(fftSize);
    for (let i = 0; i < fftSize; i++) {
      real[i] = data[offset + i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / fftSize));
    }

    // In-place Cooley-Tukey FFT
    fft(real, imag);

    // Accumulate energy per pitch class
    for (let k = 1; k < fftSize / 2; k++) {
      const pc = binChroma[k];
      if (pc >= 0) {
        const mag = Math.sqrt(real[k] * real[k] + imag[k] * imag[k]);
        chromaCounts[pc] += mag;
      }
    }
  }

  // Normalize
  const maxChroma = Math.max(...chromaCounts);
  if (maxChroma === 0) return 'Unknown';
  const normalized = Array.from(chromaCounts.map((v) => v / maxChroma));

  // Krumhansl-Kessler key profiles
  const majorProfile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
  const minorProfile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

  const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  let bestKey = 'C Major';
  let bestCorrelation = -Infinity;

  for (let shift = 0; shift < 12; shift++) {
    const rotated: number[] = [];
    for (let i = 0; i < 12; i++) {
      rotated.push(normalized[(i + shift) % 12]);
    }

    const majorCorr = pearsonCorrelation(rotated, majorProfile);
    if (majorCorr > bestCorrelation) {
      bestCorrelation = majorCorr;
      bestKey = `${noteNames[shift]} Major`;
    }

    const minorCorr = pearsonCorrelation(rotated, minorProfile);
    if (minorCorr > bestCorrelation) {
      bestCorrelation = minorCorr;
      bestKey = `${noteNames[shift]} Minor`;
    }
  }

  return bestKey;
}

/** Radix-2 Cooley-Tukey in-place FFT */
function fft(real: Float64Array, imag: Float64Array) {
  const n = real.length;
  // Bit-reversal permutation
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
    if (i < j) {
      [real[i], real[j]] = [real[j], real[i]];
      [imag[i], imag[j]] = [imag[j], imag[i]];
    }
  }
  // FFT butterfly
  for (let len = 2; len <= n; len *= 2) {
    const halfLen = len / 2;
    const angle = (-2 * Math.PI) / len;
    const wReal = Math.cos(angle);
    const wImag = Math.sin(angle);
    for (let i = 0; i < n; i += len) {
      let curReal = 1, curImag = 0;
      for (let j = 0; j < halfLen; j++) {
        const tReal = curReal * real[i + j + halfLen] - curImag * imag[i + j + halfLen];
        const tImag = curReal * imag[i + j + halfLen] + curImag * real[i + j + halfLen];
        real[i + j + halfLen] = real[i + j] - tReal;
        imag[i + j + halfLen] = imag[i + j] - tImag;
        real[i + j] += tReal;
        imag[i + j] += tImag;
        const newCurReal = curReal * wReal - curImag * wImag;
        curImag = curReal * wImag + curImag * wReal;
        curReal = newCurReal;
      }
    }
  }
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

declare module 'realtime-bpm-analyzer' {
  export function analyzeFullBuffer(audioBuffer: AudioBuffer): Promise<Array<{ tempo: number; count: number }>>;
}
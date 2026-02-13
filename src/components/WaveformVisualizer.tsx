import { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
  audioBuffer: AudioBuffer;
  className?: string;
}

const WaveformVisualizer = ({ audioBuffer, className = '' }: WaveformVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    const rawData = audioBuffer.getChannelData(0);
    const samples = displayWidth * 2;
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData: number[] = [];

    for (let i = 0; i < samples; i++) {
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(rawData[i * blockSize + j]);
      }
      filteredData.push(sum / blockSize);
    }

    const maxVal = Math.max(...filteredData);
    const normalized = filteredData.map((v) => v / maxVal);

    // Draw waveform
    const gradient = ctx.createLinearGradient(0, 0, displayWidth, 0);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(0.5, '#ec4899');
    gradient.addColorStop(1, '#f97316');

    const barWidth = displayWidth / samples;
    const centerY = displayHeight / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Draw center line
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(displayWidth, centerY);
    ctx.stroke();

    // Draw bars
    normalized.forEach((val, i) => {
      const barHeight = val * (displayHeight * 0.8);
      const x = i * barWidth;

      ctx.fillStyle = gradient;
      ctx.fillRect(x, centerY - barHeight / 2, Math.max(barWidth - 0.5, 0.5), barHeight);
    });
  }, [audioBuffer]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default WaveformVisualizer;

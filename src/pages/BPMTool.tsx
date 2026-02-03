import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Upload, Music, Loader2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const BPMTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [bpm, setBpm] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setBpm(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('audio/')) {
      setFile(droppedFile);
      setBpm(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const analyzeAudio = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setBpm(null);
    
    // Simulate analysis - replace with actual API call later
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Placeholder BPM - replace with actual result from API
    const fakeBpm = Math.floor(Math.random() * (180 - 60) + 60);
    setBpm(fakeBpm);
    setIsAnalyzing(false);
  };

  const resetTool = () => {
    setFile(null);
    setBpm(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insta-Tube</h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <Link to="/bpm-tool" className="text-gray-900 font-medium">
                BPM Tool
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                FAQ
              </Link>
              <a href="https://tubeapi.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                API
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              BPM Analyzer
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload any audio file and instantly detect its beats per minute. Perfect for DJs, producers, and music enthusiasts.
            </p>
          </div>

          {/* Upload Card */}
          <Card className="mb-8 shadow-2xl border-0 bg-white/70 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              {!isAnalyzing && bpm === null && (
                <>
                  {/* Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      {file ? file.name : 'Drop your audio file here'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'or click to browse (MP3, WAV, FLAC, etc.)'}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Analyze Button */}
                  {file && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        onClick={analyzeAudio}
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Music className="w-5 h-5 mr-2" />
                        Analyze BPM
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Analyzing State */}
              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    {/* Outer spinning ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin"></div>
                    
                    {/* Middle spinning ring */}
                    <div className="absolute inset-3 rounded-full border-4 border-pink-200"></div>
                    <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                    
                    {/* Inner spinning ring */}
                    <div className="absolute inset-6 rounded-full border-4 border-orange-200"></div>
                    <div className="absolute inset-6 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" style={{ animationDuration: '0.5s' }}></div>
                    
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Audio...</h3>
                  <p className="text-gray-600">Detecting beats and calculating tempo</p>
                  <p className="text-sm text-gray-500 mt-2">{file?.name}</p>
                </div>
              )}

              {/* Result State */}
              {bpm !== null && !isAnalyzing && (
                <div className="text-center py-8">
                  <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-white">{bpm}</span>
                      <span className="block text-white/80 text-sm font-medium">BPM</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
                  <p className="text-gray-600 mb-2">
                    Your track is running at <span className="font-semibold text-purple-600">{bpm} beats per minute</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-6">{file?.name}</p>
                  
                  <Button
                    onClick={resetTool}
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Analyze Another File
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-gray-600 text-sm">
                Supports MP3, WAV, FLAC, AAC, OGG, and more audio formats.
              </p>
            </div>

            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Analysis</h3>
              <p className="text-gray-600 text-sm">
                Advanced algorithm detects tempo in seconds with high accuracy.
              </p>
            </div>

            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upload Limit</h3>
              <p className="text-gray-600 text-sm">
                Analyze as many tracks as you want, completely free.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">Insta-Tube</h3>
            </div>
            <p className="text-gray-400 mb-4">
              The fastest and easiest way to convert YouTube videos to MP3
            </p>
            <p className="text-sm text-gray-500">© 2026 Insta Tube • Staxx Made Productions • All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BPMTool;

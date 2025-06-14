
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Play, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [url, setUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<{
    title: string;
    duration: string;
    thumbnail: string;
  } | null>(null);

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleConvert = async () => {
    if (!url.trim()) {
      toast({
        title: "Please enter a YouTube URL",
        variant: "destructive"
      });
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "Please enter a valid YouTube URL",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setConvertedFile({
        title: "Sample Video Title - Artist Name",
        duration: "3:45",
        thumbnail: "/placeholder.svg"
      });
      setIsConverting(false);
      toast({
        title: "Conversion completed!",
        description: "Your MP3 is ready for download."
      });
    }, 3000);
  };

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your MP3 file is being downloaded."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                YTmp3
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              YouTube to MP3 Converter
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Convert YouTube videos to high-quality MP3 files instantly. Fast, free, and easy to use.
            </p>
          </div>

          {/* Converter Card */}
          <Card className="mb-8 shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="url"
                      placeholder="Paste YouTube URL here..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      disabled={isConverting}
                    />
                  </div>
                  <Button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {isConverting ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Convert
                      </>
                    )}
                  </Button>
                </div>

                {/* Conversion Result */}
                {convertedFile && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {convertedFile.title}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {convertedFile.duration}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleDownload}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download MP3
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">High Quality</h3>
              <p className="text-gray-600">
                Convert YouTube videos to MP3 with the highest quality possible, up to 320kbps.
              </p>
            </div>

            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Conversion</h3>
              <p className="text-gray-600">
                Lightning-fast conversion process. Get your MP3 files in seconds, not minutes.
              </p>
            </div>

            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple interface - just paste the YouTube URL and click convert. No registration required.
              </p>
            </div>
          </div>

          {/* Instructions */}
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How to Convert YouTube to MP3
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Copy YouTube URL</h4>
                  <p className="text-gray-600 text-sm">
                    Go to YouTube and copy the URL of the video you want to convert.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Paste & Convert</h4>
                  <p className="text-gray-600 text-sm">
                    Paste the URL in the input field above and click the Convert button.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Download MP3</h4>
                  <p className="text-gray-600 text-sm">
                    Once converted, click the download button to get your MP3 file.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <h3 className="text-xl font-bold">YTmp3</h3>
            </div>
            <p className="text-gray-400 mb-4">
              The fastest and easiest way to convert YouTube videos to MP3
            </p>
            <p className="text-sm text-gray-500">
              © 2024 YTmp3. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

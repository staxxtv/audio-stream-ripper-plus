
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Play, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ConverterCard = () => {
  const [url, setUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<{
    title: string;
    duration: string;
    link: string;
    status: string;
  } | null>(null);

  // Hardcoded API key
  const API_KEY = 'YOUR_RAPIDAPI_KEY_HERE'; // Replace with your actual API key

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

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

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        title: "Could not extract video ID from URL",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    setConvertedFile(null);

    try {
      const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to convert video');
      }

      const data = await response.json();
      
      if (data.status === 'ok' && data.link) {
        setConvertedFile({
          title: data.title || 'YouTube Video',
          duration: data.duration || 'Unknown',
          link: data.link,
          status: data.status
        });
        toast({
          title: "Conversion completed!",
          description: "Your MP3 is ready for download."
        });
      } else {
        throw new Error('Conversion failed');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile?.link) {
      window.open(convertedFile.link, '_blank');
      toast({
        title: "Download started!",
        description: "Your MP3 file is being downloaded."
      });
    }
  };

  return (
    <Card className="mb-8 shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* URL Input and Convert Button */}
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
  );
};

export default ConverterCard;

import { Card, CardContent } from '@/components/ui/card';
import { Download, Play, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insta-Tube</h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                FAQ
              </Link>
            </nav>
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
              <div className="flex justify-center">
                <iframe src="https://tubeapi.org/form" width="560" height="112" title="YouTube to MP3 Converter" className="border-none rounded-lg" />
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
              <h3 className="text-xl font-bold">Insta-Tube

The fastest and easiest way to convert YouTube videos to MP3

© 2026 Insta Tube | Staxx Made Productions LLC | All rights reserved.</h3>
            </div>
            <p className="text-gray-400 mb-4">
              The fastest and easiest way to convert YouTube videos to MP3
            </p>
            <p className="text-sm text-gray-500">© 2026 Insta Tube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
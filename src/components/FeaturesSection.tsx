
import { CheckCircle, Clock, Download } from 'lucide-react';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;


import { Play } from 'lucide-react';

const Footer = () => {
  return (
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
          <p className="text-sm text-gray-500">© 2025 Insta Tube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

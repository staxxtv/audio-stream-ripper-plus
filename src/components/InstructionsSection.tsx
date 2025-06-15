
import { Card, CardContent } from '@/components/ui/card';

const InstructionsSection = () => {
  return (
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
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              2
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Paste & Convert</h4>
            <p className="text-gray-600 text-sm">
              Paste the URL in the input field above and click the Convert button.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
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
  );
};

export default InstructionsSection;

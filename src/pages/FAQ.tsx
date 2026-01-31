import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "Is this service free to use?",
    answer: "Yes, our YouTube to MP3 converter is completely free. There are no hidden fees, subscriptions, or limitations on the number of conversions you can make."
  },
  {
    question: "What audio quality can I expect?",
    answer: "Our converter supports high-quality MP3 output up to 320kbps, which is the highest quality available for MP3 files. The actual quality depends on the source video's audio quality."
  },
  {
    question: "How long does the conversion take?",
    answer: "Most conversions complete within seconds. The exact time depends on the video length and your internet connection speed. Short videos typically convert almost instantly."
  },
  {
    question: "Do I need to create an account?",
    answer: "No registration or account creation is required. Simply paste your YouTube URL and start converting immediately."
  },
  {
    question: "Is it legal to convert YouTube videos to MP3?",
    answer: "Converting YouTube videos for personal use is generally acceptable, but downloading copyrighted content without permission may violate copyright laws. Always ensure you have the right to download content."
  },
  {
    question: "What devices are supported?",
    answer: "Our web-based converter works on all devices including Windows, Mac, Linux computers, as well as iOS and Android smartphones and tablets. Any device with a modern web browser will work."
  },
  {
    question: "Are there any video length limitations?",
    answer: "Our service supports videos of various lengths. However, very long videos (several hours) may take longer to process."
  },
  {
    question: "Why did my conversion fail?",
    answer: "Conversions may fail if the video is private, age-restricted, or region-locked. Make sure the video is publicly accessible. If issues persist, try refreshing the page and attempting again."
  },
  {
    question: "Do you store my converted files?",
    answer: "No, we don't store your converted files on our servers. Files are generated on-demand and should be downloaded immediately after conversion."
  },
  {
    question: "Can I convert playlists?",
    answer: "Currently, our converter works with individual video URLs. You'll need to convert each video separately."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <Link to="/faq" className="text-gray-900 font-medium">
                FAQ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our YouTube to MP3 converter.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-gray-900 hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Back to Converter CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Ready to convert your videos?</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Converter
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">Insta-Tube</h3>
            </Link>
            <p className="text-gray-400 mb-4">
              The fastest and easiest way to convert YouTube videos to MP3
            </p>
            <p className="text-sm text-gray-500">© 2025 Insta Tube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;

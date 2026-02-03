import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'insta-tube-convert-count';

export const getConvertCount = (): number => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

export const incrementConvertCount = (): number => {
  const current = getConvertCount();
  const newCount = current + 1;
  localStorage.setItem(STORAGE_KEY, newCount.toString());
  return newCount;
};

const ConvertCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getConvertCount());
    
    // Listen for storage changes (in case count updates from another component)
    const handleStorageChange = () => {
      setCount(getConvertCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('convertCountUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('convertCountUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full">
      <TrendingUp className="w-4 h-4 text-purple-500" />
      <span className="text-purple-400 font-semibold">{count.toLocaleString()}</span>
      <span className="text-gray-400">total converts</span>
    </div>
  );
};

export default ConvertCounter;

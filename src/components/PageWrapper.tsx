import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { Navigation } from './Navigation';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('PageWrapper: Loading started');
    setIsLoading(true);
    
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('PageWrapper: Loading completed');
    }, 1000);

    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {isLoading ? <LoadingScreen /> : children}
      </main>
      <Footer />
    </div>
  );
};

export default PageWrapper;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Only show on index page
    if (location.pathname !== '/') {
      return;
    }
    
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (hasConsented === null) {
      // Show the consent dialog after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    toast({
      title: "Cookies acceptés",
      description: "Merci d'avoir accepté nos cookies!",
      duration: 3000,
    });
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    toast({
      title: "Cookies refusés",
      description: "Vous avez refusé les cookies. Certaines fonctionnalités peuvent être limitées.",
      duration: 3000,
    });
  };

  return (
    <Dialog open={showConsent} onOpenChange={setShowConsent}>
      <DialogContent className="sm:max-w-md border-2 border-primary/20 bg-gradient-to-br from-white to-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Cookie className="h-6 w-6 text-primary" />
            <span>Politique de cookies</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 pt-2">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
          </DialogDescription>
        </DialogHeader>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="py-4"
        >
          <p className="text-gray-600 mb-2">
            Ces cookies nous permettent d'analyser votre utilisation du site, 
            de personnaliser votre expérience et de vous offrir du contenu pertinent.
          </p>
          <p className="text-gray-600">
            Vous pouvez choisir d'accepter ou de refuser ces cookies à tout moment.
          </p>
        </motion.div>

        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="flex-1 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
          >
            Refuser
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Accepter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;

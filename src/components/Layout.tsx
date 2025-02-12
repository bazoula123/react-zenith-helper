
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ClipboardList, Search } from "lucide-react";
import Footer from "./Footer";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const favoritesStr = localStorage.getItem('favorites');
    if (favoritesStr) {
      try {
        const parsedFavorites = JSON.parse(favoritesStr);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, [location.pathname]); // Reload when route changes

  // Check for designs in sessionStorage
  useEffect(() => {
    const designs = sessionStorage.getItem('designs');
    if (designs) {
      try {
        const parsedDesigns = JSON.parse(designs);
        setCartCount(Array.isArray(parsedDesigns) ? parsedDesigns.length : 0);
      } catch (error) {
        console.error('Error parsing designs from sessionStorage:', error);
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="w-full bg-[#FFD700] py-2">
        <div className="container mx-auto text-center text-sm font-medium">
          <span>Livraison offerte dès 69€ d'achats !</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-white border-b">
        <div className="container mx-auto">
          {/* Upper Navigation */}
          <div className="flex items-center justify-between py-4 px-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.png" alt="ELLES" className="h-14" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl px-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Recherchez votre vêtement professionnel"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:border-[#00A6E6]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/favorites')}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
              >
                <Heart className="h-6 w-6" />
                <span className="text-sm">Wishlist</span>
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm">Panier</span>
              </button>

              <button
                onClick={() => navigate('/devis')}
                className="flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#333333]/90 transition-colors"
              >
                <ClipboardList className="h-5 w-5" />
                <span className="font-medium">DEMANDE DE DEVIS</span>
              </button>
            </div>
          </div>

          {/* Lower Navigation */}
          <div className="border-t">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-2">
                {/* Left Button */}
                <button
                  onClick={() => navigate('/personalization')}
                  className="px-6 py-2 bg-[#00A6E6] text-white rounded hover:bg-[#00A6E6]/90 transition-colors"
                >
                  Espace Personalisation
                </button>

                {/* Center Categories */}
                <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar px-4">
                  <CategoryLink 
                    href="/vetements-cuisine" 
                    topText="Vêtements"
                    bottomText="de cuisine"
                  />
                  <CategoryLink 
                    href="/vetements-boulanger" 
                    topText="Vêtements"
                    bottomText="Boulanger & Pâtissier"
                  />
                  <CategoryLink 
                    href="/vetements-boucher" 
                    topText="Vêtements"
                    bottomText="boucher"
                  />
                  <CategoryLink 
                    href="/vetements-hotellerie" 
                    topText="Vêtements"
                    bottomText="Service & Hôtellerie"
                  />
                  <CategoryLink 
                    href="/vetements-medicaux" 
                    topText="Vêtements"
                    bottomText="Médicaux"
                  />
                  <CategoryLink 
                    href="/vetements-esthetique" 
                    topText="Vêtements"
                    bottomText="esthéticiennes"
                  />
                  <CategoryLink 
                    href="/vetements-travail" 
                    topText="Vêtements"
                    bottomText="de travail"
                  />
                  <CategoryLink 
                    href="/chaussures" 
                    topText="Chaussures"
                    bottomText="de sécurité"
                  />
                  <CategoryLink 
                    href="/coutellerie" 
                    topText="Coutellerie"
                    bottomText="professionnelle"
                  />
                </div>

                {/* Right Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/marques')}
                    className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    MARQUES
                  </button>
                  <button
                    onClick={() => navigate('/metiers')}
                    className="px-6 py-2 bg-[#FFD700] text-black rounded hover:bg-[#FFD700]/90 transition-colors"
                  >
                    MÉTIERS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow" onClick={() => setShowSearchResults(false)}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

// Updated CategoryLink component to handle two lines of text
const CategoryLink = ({ 
  href, 
  topText, 
  bottomText 
}: { 
  href: string; 
  topText: string; 
  bottomText: string; 
}) => (
  <Link
    to={href}
    className="flex flex-col items-center text-center min-w-max"
  >
    <span className="text-sm text-gray-600 hover:text-[#00A6E6] transition-colors whitespace-nowrap">
      {topText}
    </span>
    <span className="text-sm text-gray-600 hover:text-[#00A6E6] transition-colors whitespace-nowrap">
      {bottomText}
    </span>
  </Link>
);

export default Layout;

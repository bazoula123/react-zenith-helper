
import React from 'react';
import { ShoppingCart, Heart, ClipboardList } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface HeaderActionsProps {
  favoritesCount?: number;
  cartCount?: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  favoritesCount = 0, 
  cartCount = 0 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate('/favorites')}
        className="hidden md:flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors relative"
      >
        <Heart className="h-5 w-5" />
        <span className="text-xs font-medium">Wishlist</span>
        {favoritesCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
      </button>

      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors relative"
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="text-xs font-medium hidden md:inline">Panier</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <button
        onClick={() => navigate('/devis')}
        className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-[#333333] text-white rounded-md hover:bg-[#333333]/90 transition-colors shadow-sm"
      >
        <ClipboardList className="h-4 w-4" />
        <span className="text-xs font-medium">DEMANDE DE DEVIS</span>
      </button>
    </div>
  );
};

export default HeaderActions;

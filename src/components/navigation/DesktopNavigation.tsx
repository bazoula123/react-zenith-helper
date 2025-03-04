
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { menuItems } from '@/config/menuConfig';
import CategoryLink from './CategoryLink';

const DesktopNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:block border-t">
      <div className="container mx-auto px-2 lg:px-4">
        <div className="flex items-center justify-between py-2 max-w-[1400px] mx-auto">
          <NavigationMenu className="-ml-4">
            <NavigationMenuList className="gap-1">
              {menuItems.map((item, index) => (
                <CategoryLink 
                  key={index}
                  href={item.path}
                  topText={item.topText}
                  bottomText={item.bottomText}
                  subItems={item.subItems}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/personalization')}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs font-medium"
            >
              Personalisation
            </button>
            <button
              onClick={() => navigate('/metiers')}
              className="px-3 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/90 transition-colors text-xs font-medium shadow-sm"
            >
              MÉTIERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavigation;

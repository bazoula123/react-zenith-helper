
import React from 'react';
import { MenuItem } from '@/config/menuConfig';
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, ArrowLeft } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import Image from '@/components/ui/image';
import { getCategoryBanner } from '@/utils/categoryImageMappings';

interface MobileMenuProps {
  menuItems: MenuItem[];
  activeMenuItem: MenuItem | null;
  setActiveMenuItem: (item: MenuItem | null) => void;
  isSubmenuOpen: boolean;
  setIsSubmenuOpen: (isOpen: boolean) => void;
  handleNavigation: (path: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuItems,
  activeMenuItem,
  setActiveMenuItem,
  isSubmenuOpen,
  setIsSubmenuOpen,
  handleNavigation
}) => {
  const location = useLocation();
  
  const openSubmenu = (item: MenuItem) => {
    setActiveMenuItem(item);
    setIsSubmenuOpen(true);
  };

  const getSubitemImage = (title: string, currentImage: string): string => {
    // Map the title to the corresponding image in the Subitems folder
    const imageMap: Record<string, string> = {
      "Vestes de Chef": "/Subitems/VestesdeChef.png",
      "Tabliers": "/Subitems/TablierCuisine.png",
      "Tabliers Pro": "/Subitems/TabliersProChef.png",
      "Vestes de Boulanger": "/Subitems/VestesDeBoulanger.png",
      "Vestes Pro Boucher": "/Subitems/VesteProBoucher.png",
      "Uniformes de Service": "/Subitems/UniformeDeService.png",
      "Tenues d'Accueil": "/Subitems/TenueAcceuil.png",
      "Combinaisons": "/Subitems/Combinaison.png",
      "Vestes de Travail": "/Subitems/VesteDeTravail.png",
      "Blouses Médicales": "/Subitems/BlousesMedical.png",
      "Tuniques Médicales": "/Subitems/TuniqueMedical.png",
      "Chaussures Cuisine": "/Subitems/ChaussureCuisine.png",
      "Chaussures Pro": "/Subitems/ChaussurePro.png",
      "Pack Restaurant": "/Subitems/PackRestaurant.png",
      "Pack Café": "/Subitems/PackCaffe.png",
      "Pack Hôtel": "/Subitems/PackHotel.png",
      "Pack Médecin": "/Subitems/PackMedecin.png",
      "Drapeaux": "/Subitems/Drapeaux.png",
      "Mugs": "/Subitems/Mugs.png",
      "Carnets": "/Subitems/NotebookPersonalisable.png",
      "Cartes de Visite": "/Subitems/CarteVisites.png",
      "Notebook Personnalisable": "/Subitems/NotebookPersonalisable.png",
      "Notebook Restaurant": "/Subitems/NotebookRestaurent.png"
    };

    return imageMap[title] || currentImage;
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px]">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          
          <div className="bg-white p-4 flex items-center justify-center border-b">
            <img src="/logo.png" alt="ELLES" className="h-12" />
          </div>

          <div className="divide-y">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "w-full flex items-center justify-between p-4 hover:bg-gray-50",
                  location.pathname === item.path && "border-2 border-primary text-primary rounded-md"
                )}
                onClick={() => {
                  if (item.subItems && item.subItems.length > 0) {
                    openSubmenu(item);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-left">{item.title}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      
      <Sheet open={isSubmenuOpen} onOpenChange={setIsSubmenuOpen}>
        <SheetContent side="left" className="w-full sm:w-[350px] p-0">
          {activeMenuItem && (
            <div className="flex flex-col h-full">
              <SheetHeader className="p-4 border-b">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 -ml-2"
                  onClick={() => setIsSubmenuOpen(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Retour</span>
                </Button>
                <SheetTitle className="mt-2">{activeMenuItem.title}</SheetTitle>
              </SheetHeader>
              
              {/* Banner Image Section */}
              <div className="p-4 border-b">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <Image 
                    src={getCategoryBanner(activeMenuItem.path)} 
                    alt={activeMenuItem.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeMenuItem.subItems.map((subItem) => {
                  const subitemImage = getSubitemImage(subItem.title, subItem.image);
                  
                  return (
                    <div
                      key={subItem.path}
                      className="group cursor-pointer"
                      onClick={() => handleNavigation(subItem.path)}
                    >
                      <div className="aspect-video rounded-lg overflow-hidden bg-white mb-3">
                        <Image 
                          src={subitemImage} 
                          alt={subItem.title}
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {subItem.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {subItem.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;

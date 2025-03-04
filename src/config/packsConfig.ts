
import { menuItems } from "./menuConfig";

export interface PackItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface PackConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  items: PackItem[];
}

// Extract pack data from menuItems for consistency
const extractPacksFromMenu = (): PackConfig[] => {
  const packsMenuItem = menuItems.find(item => item.title === "Nos packs");
  
  if (!packsMenuItem || !packsMenuItem.subItems) {
    return [];
  }
  
  return packsMenuItem.subItems.map(subItem => {
    const pathSegments = subItem.path.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    return {
      id,
      title: subItem.title,
      description: subItem.description,
      image: subItem.image,
      items: getPackItemsById(id)
    };
  });
};

// Pack items configuration
const getPackItemsById = (packId: string): PackItem[] => {
  switch (packId) {
    case "restaurant":
      return [
        { id: "1", name: "Veste de Chef", description: "Veste professionnelle pour cuisine", image: "/VetementDeCuisine/VesteDeChef.jpg" },
        { id: "2", name: "Tablier", description: "Protection pour la cuisine", image: "/VetementDeCuisine/TablierDeChef.jpg" },
        { id: "3", name: "Pantalon de Cuisine", description: "Confort et durabilité", image: "/VetementDeCuisine/PontalonDeChef.jpg" },
        { id: "4", name: "Chaussures de Sécurité", description: "Sécurité en cuisine", image: "/ChausureDeTravail/ChaussureDeCuisine.jpg" },
      ];
    case "cafe":
      return [
        { id: "1", name: "Tablier Barista", description: "Protection élégante", image: "/VetementDeCuisine/TablierDeChef.jpg" },
        { id: "2", name: "Uniforme de Service", description: "Tenue professionnelle", image: "/VetementServiceHotellerie/UniformeDeService.jpg" },
        { id: "3", name: "Chaussures Confort", description: "Pour le service", image: "/ChausureDeTravail/ChaussureDeCuisine.jpg" },
      ];
    case "hotel":
      return [
        { id: "1", name: "Tenue d'Accueil", description: "Première impression impeccable", image: "/VetementServiceHotellerie/TenueDacceuilHotelBanner.jpg" },
        { id: "2", name: "Uniforme Chambre", description: "Pour le personnel d'entretien", image: "/VetementServiceHotellerie/UniformeDeService.jpg" },
        { id: "3", name: "Vêtements Restaurant", description: "Pour le restaurant d'hôtel", image: "/VetementDeCuisine/VesteDeChef.jpg" },
      ];
    case "medecin":
      return [
        { id: "1", name: "Blouse Médicale", description: "Pour les médecins", image: "/VetementDeTravail/BlouseMedical.jpg" },
        { id: "2", name: "Tunique Médicale", description: "Pour les infirmiers", image: "/VetementDeTravail/TuniqueMedical.png" },
        { id: "3", name: "Pantalon Médical", description: "Confort toute la journée", image: "/VetementDeTravail/CombinaionDeTravail.jpg" },
      ];
    default:
      return [];
  }
};

export const packsConfig = extractPacksFromMenu();

export const getPackById = (packId: string | undefined): PackConfig | undefined => {
  if (!packId) return undefined;
  return packsConfig.find(pack => pack.id === packId);
};

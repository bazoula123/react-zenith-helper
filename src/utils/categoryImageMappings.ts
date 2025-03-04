
// Map category paths to their corresponding banner images
export const categoryBannerMap: Record<string, string> = {
  "/vetements-cuisine": "/Subitems/VetementCuisineBanner.png",
  "/vetements-hotellerie": "/Subitems/VetementsServiceBanner.png",
  "/vetements-travail": "/Subitems/VetementDeTravailBanner.png",
  "/chaussures": "/Subitems/ChausureSecuriteBanner.png",
  "/nos-packs": "/Subitems/NoPacksBanner.png",
  "/produits-marketing": "/Subitems/ProduitPersonalisableBaner.png"
};

export const getCategoryBanner = (path: string): string => {
  return categoryBannerMap[path] || "/placeholder.png";
};

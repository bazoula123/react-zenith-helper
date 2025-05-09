
/**
 * PropertyCard.tsx
 * 
 * Description (FR):
 * Ce composant affiche une propriété immobilière sous forme de carte.
 * Il présente:
 * - Une image de la propriété
 * - Des informations essentielles (titre, prix, adresse)
 * - Des caractéristiques (chambres, salles de bain, surface)
 * - Un indicateur de statut avec code couleur
 * - Des actions possibles (suppression, navigation)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, MapPin, Star, Bed, Bath, Square, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PropertyData {
  id: string;
  title: string;
  address: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  rating: number;
  status: 'available' | 'booked' | 'maintenance';
  imageUrl: string;
}

interface PropertyCardProps {
  property: PropertyData;
  onDelete?: (id: string) => void;
  className?: string;
  showActions?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onDelete,
  className,
  showActions = true,
}) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const statusColors = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
    booked: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réservé' },
    maintenance: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Maintenance' }
  };

  const statusStyle = statusColors[property.status];

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click wasn't on a button
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    
    console.log(`Navigating to: /properties/${property.id}`);
    navigate(`/properties/${property.id}`);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer h-full",
        "glass-card border border-border/50 flex flex-col",
        isHovering ? "scale-[1.02]" : "",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden w-full aspect-[4/3]">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-t-lg" />
        )}
        <img
          src={property.imageUrl}
          alt={property.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovering ? "scale-110" : ""
          )}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
          <Badge className={cn("font-medium", statusStyle.bg, statusStyle.text)}>
            {statusStyle.label}
          </Badge>
          <Badge variant="secondary" className="glass-card">
            {property.price}€/nuit
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite action
          }}
        >
          <Heart size={18} />
        </Button>
      </div>
      
      <CardHeader className="p-4 pb-2 space-y-2 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{property.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{property.address}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center text-sm">
            <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Chambre' : 'Chambres'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Bath className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'SdB' : 'SdBs'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Square className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </CardContent>
      
      {showActions && onDelete && (
        <CardFooter className="p-4 pt-2 flex justify-between mt-auto">
          <Badge variant="outline" className="font-normal text-xs">
            {property.type}
          </Badge>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(property.id);
              }}
            >
              Supprimer
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

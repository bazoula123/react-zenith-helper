import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, ArrowLeft, MapPin, Star, Bed, Bath, Square, 
  Edit, Trash, Heart, Share, ClipboardCheck, Settings, CalendarDays, BarChart3,
  AlertTriangle, Users, History, User, Loader2
} from 'lucide-react';
import { PropertyData } from '@/components/PropertyCard';
import { OfficePropertyData } from '@/components/OfficePropertyCard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { propertyApi, Property } from '@/services/api';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, canEdit, canDelete } = useAuth();
  const [property, setProperty] = useState<PropertyData | OfficePropertyData | null>(null);
  const [propertyType, setPropertyType] = useState<'residential' | 'office' | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const apiProperty = await propertyApi.getPropertyById(id);
        
        if (apiProperty.property_type === 'office') {
          const officeProperty = propertyApi.mapApiPropertyToOfficePropertyData(apiProperty);
          setProperty(officeProperty);
          setPropertyType('office');
        } else {
          const residentialProperty = propertyApi.mapApiPropertyToPropertyData(apiProperty);
          setProperty(residentialProperty);
          setPropertyType('residential');
        }
        
        setOwner(`Propriétaire (${apiProperty.owner_id || 'unknown@example.com'})`);
        
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast({
          title: "Propriété Non Trouvée",
          description: "La propriété que vous recherchez n'existe pas ou a été supprimée.",
          variant: "destructive",
        });
        navigate('/properties');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <Building2 className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-medium">Propriété non trouvée</h2>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/properties')}
          >
            Retour aux propriétés
          </Button>
        </div>
      </Layout>
    );
  }

  const statusColors = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
    booked: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réservé' },
    maintenance: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Maintenance' }
  };

  const statusStyle = statusColors[property.status];

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isFavorited 
        ? `${property.title} a été retiré de vos favoris.` 
        : `${property.title} a été ajouté à vos favoris.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien Copié",
      description: "Le lien de la propriété a été copié dans le presse-papiers.",
    });
  };

  const handleEdit = () => {
    toast({
      title: "Modifier la Propriété",
      description: `Modification de la propriété: ${property.title}`,
    });
  };

  const handleDelete = async () => {
    try {
      await propertyApi.deleteProperty(property.id);
      toast({
        title: "Supprimer la Propriété",
        description: `La propriété: ${property.title} a été supprimée.`,
      });
      navigate('/properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Erreur de Suppression",
        description: `Impossible de supprimer la propriété: ${property.title}`,
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (newStatus: 'available' | 'booked' | 'maintenance') => {
    try {
      await propertyApi.updatePropertyStatus(property.id, newStatus);
      
      setProperty(prev => {
        if (prev) {
          return { ...prev, status: newStatus };
        }
        return prev;
      });
      
      toast({
        title: "Statut Mis à Jour",
        description: `Statut de la propriété modifié en: ${statusColors[newStatus].label}`,
      });
    } catch (error) {
      console.error('Error updating property status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la propriété",
        variant: "destructive",
      });
    }
  };

  const isAdmin = user?.role === 'admin';
  const isProprietaire = user?.role === 'owner';

  const isOfficeProperty = propertyType === 'office';
  const officeProperty = isOfficeProperty ? property as OfficePropertyData : null;
  const residentialProperty = !isOfficeProperty ? property as PropertyData : null;

  return (
    <Layout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/properties')} 
          className="mb-4 -ml-2 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux Propriétés
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.address}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn("text-sm", statusStyle.bg, statusStyle.text)}>
                {statusStyle.label}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {property.type}
              </Badge>
              <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{property.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-end md:self-start">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleFavorite}
              className={isFavorited ? "text-red-500 hover:text-red-600" : ""}
            >
              <Heart 
                className={cn("mr-1.5 h-4 w-4", isFavorited && "fill-red-500")} 
              />
              {isFavorited ? "Favori" : "Ajouter aux favoris"}
            </Button>
            <Button size="sm" variant="outline" onClick={handleShare}>
              <Share className="mr-1.5 h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full max-w-3xl mx-auto grid grid-cols-2">
            <TabsTrigger value="details">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Détails
            </TabsTrigger>
            {canEdit('properties') && (
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-lg overflow-hidden shadow-md aspect-video bg-slate-100">
                  <img 
                    src={property.imageUrl} 
                    alt={property.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">À Propos de Cette Propriété</h2>
                    <p className="text-muted-foreground">
                      Cette magnifique {property.type.toLowerCase()} dispose de {property.bedrooms} chambres et {property.bathrooms} salles de bain 
                      avec une superficie totale de {property.area} m². Située dans un emplacement privilégié, cette propriété 
                      offre des équipements modernes et des vues imprenables.
                    </p>
                    
                    {isAdmin && (
                      <div className="mt-4 flex items-center bg-slate-50 p-3 rounded-md border border-slate-200">
                        <User className="h-5 w-5 mr-2 text-slate-600" />
                        <div>
                          <p className="text-sm font-medium">Propriétaire</p>
                          <p className="text-xs text-muted-foreground">{property.owner}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Caractéristiques</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <Bed className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{property.bedrooms} Chambres</p>
                            <p className="text-xs text-muted-foreground">Chambres spacieuses</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <Bath className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{property.bathrooms} Salles de bain</p>
                            <p className="text-xs text-muted-foreground">Installations modernes</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <Square className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{property.area} m²</p>
                            <p className="text-xs text-muted-foreground">Surface habitable totale</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isProprietaire && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Statut de la Propriété</h4>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant={property.status === 'available' ? 'default' : 'outline'} 
                            size="sm"
                            className={property.status === 'available' ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleStatusChange('available')}
                          >
                            Disponible
                          </Button>
                          <Button 
                            variant={property.status === 'booked' ? 'default' : 'outline'} 
                            size="sm"
                            className={property.status === 'booked' ? "bg-blue-600 hover:bg-blue-700" : ""}
                            onClick={() => handleStatusChange('booked')}
                          >
                            Réservé
                          </Button>
                          <Button 
                            variant={property.status === 'maintenance' ? 'default' : 'outline'} 
                            size="sm"
                            className={property.status === 'maintenance' ? "bg-amber-600 hover:bg-amber-700" : ""}
                            onClick={() => handleStatusChange('maintenance')}
                          >
                            Maintenance
                          </Button>
                        </div>
                      </div>
                    )}

                    {(isProprietaire || isAdmin) && <Separator />}

                    {isProprietaire && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Prix et Disponibilité</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs mb-1">Prix par nuit (€)</label>
                            <Input type="number" defaultValue={property.price} />
                          </div>
                          <div>
                            <label className="block text-xs mb-1">Min. nuits</label>
                            <Input type="number" defaultValue={1} />
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-2">Mettre à jour le prix</Button>
                      </div>
                    )}

                    {(isProprietaire || canDelete('properties')) && <Separator />}

                    <div className="space-y-3">
                      {canEdit('properties') && (
                        <Button variant="outline" className="w-full" onClick={handleEdit}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier la Propriété
                        </Button>
                      )}
                      
                      {isProprietaire && (
                        <Button variant="outline" className="w-full" onClick={() => navigate(`/properties/${id}/calendar`)}>
                          <CalendarDays className="mr-2 h-4 w-4" />
                          Gérer le Calendrier
                        </Button>
                      )}

                      {canDelete('properties') && (
                        <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" onClick={handleDelete}>
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer la Propriété
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Taux d'occupation</span>
                      </div>
                      <Badge>78%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Note moyenne</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50">{property.rating.toFixed(1)}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <History className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Réservations totales</span>
                      </div>
                      <Badge variant="outline">24</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Signalements</span>
                      </div>
                      <Badge variant="outline">0</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {canEdit('properties') && (
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de la Propriété</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">Titre de la Propriété</label>
                      <Input id="title" defaultValue={property.title} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="type" className="text-sm font-medium">Type de Propriété</label>
                        <Select defaultValue={property.type.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appartement">Appartement</SelectItem>
                            <SelectItem value="maison">Maison</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="chalet">Chalet</SelectItem>
                            <SelectItem value="cottage">Cottage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="price" className="text-sm font-medium">Prix par Nuit (€)</label>
                        <Input id="price" type="number" defaultValue={property.price} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                      <Input id="address" defaultValue={property.address} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="bedrooms" className="text-sm font-medium">Chambres</label>
                        <Input id="bedrooms" type="number" defaultValue={property.bedrooms} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="bathrooms" className="text-sm font-medium">Salles de Bain</label>
                        <Input id="bathrooms" type="number" defaultValue={property.bathrooms} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="area" className="text-sm font-medium">Surface (m²)</label>
                        <Input id="area" type="number" defaultValue={property.area} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="image" className="text-sm font-medium">URL de l'Image</label>
                      <Input id="image" defaultValue={property.imageUrl} />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">Annuler</Button>
                      <Button>Enregistrer les Modifications</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default PropertyDetails;

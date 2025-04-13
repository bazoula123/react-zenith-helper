/**
 * Properties.tsx
 * 
 * Description (FR):
 * Page principale de gestion des bureaux et espaces professionnels.
 * Cette page permet de visualiser, filtrer et gérer l'ensemble des locaux
 * professionnels avec différentes vues (grille et tableau) et options de filtrage.
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List,
  SlidersHorizontal,
  Table as TableIcon
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { OfficePropertyCard, OfficePropertyData } from '@/components/OfficePropertyCard';
import { OfficePropertyTable } from '@/components/OfficePropertyTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Composant principal de la page des espaces professionnels
 * 
 * Fonctionnalités:
 * - Affichage des bureaux en mode grille ou tableau
 * - Recherche et filtrage des espaces
 * - Ajout, modification et suppression de bureaux
 * - Affichage conditionnel selon le nombre d'espaces
 */
const Properties = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données fictives des espaces professionnels
  const officesData: OfficePropertyData[] = [
    {
      id: 'off1',
      title: 'Bureau Premium Centre-Ville',
      address: '123 Avenue des Affaires, Paris',
      price: 80,
      type: 'Bureau privé',
      workstations: 6,
      meetingRooms: 1,
      area: 120,
      rating: 4.8,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      amenities: {
        wifi: true,
        parking: true,
        coffee: true,
        reception: true,
        secured: true,
        accessible: true,
        printers: true,
        kitchen: false
      },
      flexibleHours: true
    },
    {
      id: 'off2',
      title: 'Espace de Coworking Moderne',
      address: '456 Boulevard de l\'Innovation, Lyon',
      price: 35,
      type: 'Coworking',
      workstations: 20,
      meetingRooms: 3,
      area: 250,
      rating: 4.6,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      amenities: {
        wifi: true,
        parking: true,
        coffee: true,
        reception: true,
        secured: false,
        accessible: true,
        printers: true,
        kitchen: true
      },
      flexibleHours: true
    },
    {
      id: 'off3',
      title: 'Salle de Conférence Équipée',
      address: '789 Rue du Commerce, Bordeaux',
      price: 150,
      type: 'Salle de réunion',
      workstations: 0,
      meetingRooms: 1,
      area: 90,
      rating: 4.9,
      status: 'booked',
      imageUrl: 'https://images.unsplash.com/photo-1505409859467-3a796fd5798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      amenities: {
        wifi: true,
        parking: true,
        coffee: false,
        reception: false,
        secured: true,
        accessible: true,
        printers: false,
        kitchen: false
      },
      flexibleHours: false
    },
    {
      id: 'off4',
      title: 'Local Commercial Rénové',
      address: '10 Place du Marché, Marseille',
      price: 120,
      type: 'Local commercial',
      workstations: 4,
      meetingRooms: 0,
      area: 85,
      rating: 4.5,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1604328471151-b52466bbf2f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      amenities: {
        wifi: true,
        parking: false,
        coffee: false,
        reception: false,
        secured: true,
        accessible: false,
        printers: false,
        kitchen: false
      },
      flexibleHours: false
    },
    {
      id: 'off5',
      title: 'Bureau Partagé Créatif',
      address: '22 Avenue du Design, Lille',
      price: 40,
      type: 'Bureau partagé',
      workstations: 12,
      meetingRooms: 2,
      area: 180,
      rating: 4.7,
      status: 'maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      amenities: {
        wifi: true,
        parking: true,
        coffee: true,
        reception: true,
        secured: false,
        accessible: true,
        printers: true,
        kitchen: true
      },
      flexibleHours: true
    },
    {
      id: 'off6',
      title: 'Studio Photo Professionnel',
      address: '76 Rue des Arts, Nantes',
      price: 95,
      type: 'Studio',
      workstations: 2,
      meetingRooms: 1,
      area: 110,
      rating: 4.8,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      amenities: {
        wifi: true,
        parking: false,
        coffee: false,
        reception: false,
        secured: true,
        accessible: true,
        printers: false,
        kitchen: false
      },
      flexibleHours: true
    }
  ];

  // Filtrage des espaces professionnels selon les critères de recherche et filtres
  const filteredProperties = officesData.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Gestion des actions sur les bureaux
  const handleEditProperty = (id: string) => {
    toast({
      title: "Modifier l'espace",
      description: `Modification de l'espace ID: ${id}`,
    });
  };

  const handleDeleteProperty = (id: string) => {
    toast({
      title: "Supprimer l'espace",
      description: `L'espace ID: ${id} a été supprimé.`,
      variant: "destructive",
    });
  };

  const handleAddProperty = () => {
    toast({
      title: "Espace Professionnel Ajouté",
      description: "Le nouvel espace a été ajouté avec succès.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Espaces Professionnels</h1>
            <p className="text-muted-foreground mt-1">Gérez vos bureaux et locaux commerciaux</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un Espace
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un Nouvel Espace Professionnel</DialogTitle>
                <DialogDescription>
                  Entrez les détails de votre nouvel espace de travail.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Nom de l'Espace</label>
                  <Input id="title" placeholder="Entrez le nom de l'espace" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium">Type d'Espace</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bureau_prive">Bureau privé</SelectItem>
                        <SelectItem value="coworking">Espace coworking</SelectItem>
                        <SelectItem value="salle_reunion">Salle de réunion</SelectItem>
                        <SelectItem value="local_commercial">Local commercial</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">Prix par Jour (€)</label>
                    <Input id="price" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                  <Input id="address" placeholder="Entrez l'adresse de l'espace" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="workstations" className="text-sm font-medium">Postes de travail</label>
                    <Input id="workstations" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="meetingRooms" className="text-sm font-medium">Salles de Réunion</label>
                    <Input id="meetingRooms" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="area" className="text-sm font-medium">Surface (m²)</label>
                    <Input id="area" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="image" className="text-sm font-medium">URL de l'Image</label>
                  <Input id="image" placeholder="Entrez l'URL de l'image" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button">Annuler</Button>
                <Button type="submit" onClick={handleAddProperty}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des espaces professionnels..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les Espaces</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="booked">Réservé</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            
            <Tabs defaultValue={viewMode} className="w-auto h-9">
              <TabsList>
                <TabsTrigger 
                  value="grid" 
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger 
                  value="list" 
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger 
                  value="table" 
                  onClick={() => setViewMode('table')}
                >
                  <TableIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
            <Building2 className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-medium">Aucun espace professionnel trouvé</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
            </p>
            <Button variant="outline" className="mt-6">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter Votre Premier Espace
            </Button>
          </div>
        ) : (
          <>
            {/* Vue en grille */}
            {viewMode === 'grid' && (
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredProperties.map((property) => (
                  <OfficePropertyCard 
                    key={property.id} 
                    property={property}
                    onDelete={handleDeleteProperty}
                    showActions={true}
                  />
                ))}
              </div>
            )}
            
            {/* Vue en liste */}
            {viewMode === 'list' && (
              <div className="flex flex-col space-y-6">
                {filteredProperties.map((property) => (
                  <OfficePropertyCard 
                    key={property.id} 
                    property={property}
                    onDelete={handleDeleteProperty}
                    className="flex flex-row h-auto max-h-64"
                    showActions={true}
                  />
                ))}
              </div>
            )}
            
            {/* Vue en tableau */}
            {viewMode === 'table' && (
              <OfficePropertyTable
                properties={filteredProperties}
                onDelete={handleDeleteProperty}
                onEdit={handleEditProperty}
                showActions={true}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Properties;

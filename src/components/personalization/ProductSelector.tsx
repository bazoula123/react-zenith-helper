import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ProductCategory } from "./types";
import { useState } from "react";

interface ProductSelectorProps {
  categories: ProductCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

const ProductSelector = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            onClick={() => {
              onCategorySelect(category.id);
              toast.success(`Catégorie ${category.name} sélectionnée`);
            }}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
              selectedCategory === category.id
                ? "border-2 border-primary"
                : "hover:border-primary/50"
            }`}
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={category.imageUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <category.icon className="h-6 w-6 text-primary" />
                <h3 className="font-medium">{category.name}</h3>
              </div>
              <p className="text-sm text-gray-600">
                {category.description || "Personnalisez votre produit unique"}
              </p>
              <p className="text-sm font-medium text-primary">
                À partir de {category.startingPrice || "30.00"} TND
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
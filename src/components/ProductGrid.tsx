
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "@/config/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductGridProps {
  onAddToCart: () => void;
  limit?: number;
}

const ProductGrid = ({ onAddToCart, limit }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const categories = ["all", ...new Set(products.map(product => product.name))];
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.name === selectedCategory);

  const displayedProducts = limit 
    ? filteredProducts.slice(0, limit) 
    : filteredProducts;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="max-w-[95vw] mx-auto relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-4"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {displayedProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer h-[500px] flex flex-col"
                >
                  <div className="h-[300px] overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    <img
                      src={product.image || "https://placehold.co/800x800"}
                      alt={product.name}
                      className={`w-full h-full object-contain p-4 transition-opacity duration-300 ${
                        product.presentationImage ? 'group-hover:opacity-0' : ''
                      }`}
                    />
                    {product.presentationImage && (
                      <img
                        src={product.presentationImage}
                        alt={`${product.name} presentation`}
                        className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}
                  </div>

                  <div className="flex flex-col flex-grow p-6 bg-white justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{product.name}</div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-4 text-primary">
                        À partir de {product.startingPrice} TND
                      </p>
                      <button
                        className="w-full bg-primary hover:bg-primary/90 text-white transition-colors py-3 rounded-lg font-medium"
                        onClick={() => navigate('/personalization')}
                      >
                        Personnaliser
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductGrid;

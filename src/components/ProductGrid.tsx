
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "@/config/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react';

interface ProductGridProps {
  onAddToCart: () => void;
  limit?: number;
}

const ProductGrid = ({ onAddToCart, limit }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Initialize Embla with options
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 3 }
    }
  }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      console.log('Scrolling prev');
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      console.log('Scrolling next');
    }
  }, [emblaApi]);

  // Track whether we can scroll
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

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
        <div className="relative px-8">
          <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayedProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] pl-4">
                  <div 
                    className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl h-full mx-2"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
                      <div className="relative w-full h-full">
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
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-xs text-gray-500">{product.name}</div>
                      <h3 className="font-sans text-lg font-medium text-primary">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-primary">À partir de {product.startingPrice} TND</p>
                        <button
                          onClick={() => navigate('/personalization')}
                          className="rounded-full bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90"
                        >
                          Personnaliser
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 flex items-center justify-center transition-all duration-200 border border-gray-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 flex items-center justify-center transition-all duration-200 border border-gray-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;

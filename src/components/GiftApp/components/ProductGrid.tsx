import React from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { formatPrice } from '@/utils/priceCalculations';

interface ProductGridProps {
  products: Product[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onDragStart, onProductSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="relative bg-black/90 backdrop-blur-sm rounded-lg p-2 cursor-grab active:cursor-grabbing border border-gray-800/30 transition-all duration-300 hover:border-gray-700/50"
          draggable
          onDragStart={(e) => onDragStart(e, product)}
          onClick={() => onProductSelect(product)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="aspect-square relative mb-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xs font-medium text-white truncate">
              {product.name}
            </h3>
            <p className="text-xs font-medium text-[#fff]">
              {formatPrice(product.price)} TND
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
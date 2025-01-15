import { Product } from '@/types/product';

export const filterProductsByCategory = (products: Product[], categories: { label: string; type: string; value: string }[]) => {
  if (!categories || categories.length === 0) return products;
  
  return products.filter(product => {
    return categories.every(category => {
      if (category.type === 'itemgroup') {
        return product.itemgroup_product?.toLowerCase() === category.value.toLowerCase();
      }
      if (category.type === 'type') {
        return product.type_product?.toLowerCase() === category.value.toLowerCase();
      }
      return true;
    });
  });
};
import { Product } from '@/types/product';

interface CategoryConfig {
  label: string;
  type: string;
  value: string;
  additionalFilter?: {
    field: string;
    value: string;
  };
}

export const filterProductsByCategory = (products: Product[], categories: CategoryConfig[]) => {
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

export const getAvailableCategories = (packType: string, containerIndex: number, selectedItems: Product[]): CategoryConfig[] => {
  switch (packType) {
    case 'Pack Premium':
      return [
        { label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' },
        { label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }
      ];
    case 'Pack Prestige':
      if (containerIndex === 0) {
        return [{ 
          label: 'Chemises', 
          type: 'itemgroup', 
          value: 'chemises',
          additionalFilter: {
            field: 'category_product',
            value: 'homme'
          }
        }];
      } else if (containerIndex === 1) {
        return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
      } else {
        return [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }];
      }
    case 'Pack Duo':
      if (containerIndex === 0) {
        return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }];
      } else {
        return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
      }
    default:
      return [];
  }
};
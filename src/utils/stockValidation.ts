export const getAvailableStockForSize = (product: any, size: string): number => {
  // For costume sizes (48-58)
  if (product.itemgroup_product === 'costumes') {
    const sizeKey = `${size}_size`;
    return parseInt(product[sizeKey] || '0');
  }

  // For regular sizes (S-3XL)
  const sizeMapping: { [key: string]: string } = {
    'S': 's_size',
    'M': 'm_size',
    'L': 'l_size',
    'XL': 'xl_size',
    'XXL': 'xxl_size',
    '3XL': '3xl_size'
  };

  const sizeKey = sizeMapping[size.toUpperCase()];
  if (sizeKey && product[sizeKey]) {
    return parseInt(product[sizeKey]);
  }
  
  return 0;
};

export const getAvailableSizes = (product: any): string[] => {
  const sizes: string[] = [];

  // Check regular sizes (S-XXL)
  const regularSizes = {
    's_size': 'S',
    'm_size': 'M',
    'l_size': 'L',
    'xl_size': 'XL',
    'xxl_size': 'XXL',
    '3xl_size': '3XL'
  };

  // Add regular sizes if they have stock
  Object.entries(regularSizes).forEach(([key, label]) => {
    if (product[key] && parseInt(product[key]) > 0) {
      sizes.push(label);
    }
  });

  // Check costume sizes (48-58)
  if (product.itemgroup_product === 'costumes') {
    const costumeSizes = ['48', '50', '52', '54', '56', '58'];
    costumeSizes.forEach(size => {
      const sizeKey = `${size}_size`;
      if (product[sizeKey] && parseInt(product[sizeKey]) > 0) {
        sizes.push(size);
      }
    });
  }

  return sizes;
};

export const getTotalStock = (product: any): number => {
  let total = 0;

  // Sum regular sizes
  const regularSizes = ['s_size', 'm_size', 'l_size', 'xl_size', 'xxl_size', '3xl_size'];
  regularSizes.forEach(size => {
    if (product[size]) {
      total += parseInt(product[size]);
    }
  });

  // Sum costume sizes if applicable
  if (product.itemgroup_product === 'costumes') {
    const costumeSizes = ['48_size', '50_size', '52_size', '54_size', '56_size', '58_size'];
    costumeSizes.forEach(size => {
      if (product[size]) {
        total += parseInt(product[size]);
      }
    });
  }

  return total;
};
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
  if (product.itemgroup_product === 'costumes') {
    return ['48', '50', '52', '54', '56', '58']
      .filter(size => parseInt(product[`${size}_size`] || '0') > 0);
  }

  const sizeMapping = {
    'S': 's_size',
    'M': 'm_size',
    'L': 'l_size',
    'XL': 'xl_size',
    'XXL': 'xxl_size',
    '3XL': '3xl_size'
  };

  return Object.entries(sizeMapping)
    .filter(([_, key]) => parseInt(product[key] || '0') > 0)
    .map(([size]) => size);
};

export const getTotalStock = (product: any): number => {
  return parseInt(product.qnty_product || '0');
};

export interface Product {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  image?: string;
  isPersonalizable?: boolean;
  type?: string; // Changed from string literal union to accept any string
  category?: string;
  availableColors?: ProductColor[];
}

export interface ProductColor {
  name: string;
  value: string;
  border?: string;
}

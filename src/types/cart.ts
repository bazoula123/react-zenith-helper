export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type_product: string;
  itemgroup_product: string;
  size: string;
  color: string;
  personalization: string;
  pack: string;
  fromPack?: boolean;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  hasNewsletterDiscount: boolean;
  applyNewsletterDiscount: () => void;
  removeNewsletterDiscount: () => void;
  calculateTotal: () => {
    subtotal: number;
    shipping: number;
    total: number;
    discount: number;
  };
}
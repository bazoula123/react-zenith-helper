import React from 'react';
import { X } from 'lucide-react';
import { formatPrice } from '@/utils/priceCalculations';
import { CartItem } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  const isPackagingFee = item.type_product === "Pack" && item.name.includes("Frais de packaging");
  const shouldShowPersonalization = !isPackagingFee && item.personalization && item.personalization !== '-';

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="relative w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      <div className="flex-grow space-y-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        
        {item.size && item.size !== '-' && (
          <p className="text-sm text-gray-600">
            Taille: {item.size}
          </p>
        )}

        {shouldShowPersonalization && (
          <p className="text-sm text-gray-600">
            Personnalisation: {item.personalization}
          </p>
        )}

        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
              className="w-16 h-8 text-center"
            />
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>

          <p className="font-medium text-gray-900">
            {formatPrice(item.price * item.quantity)} TND
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-gray-500"
        onClick={() => onRemove(item.id)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartItemCard;
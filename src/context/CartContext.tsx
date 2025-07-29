import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedConfiguration?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; configuration?: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Reducer to handle cart actions
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, configuration } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.selectedConfiguration === configuration
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      } else {
        // Add new item only if it doesn't already exist
        const newItem: CartItem = {
          product,
          quantity,
          selectedConfiguration: configuration,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// Context interface
interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number, configuration?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Context creation
const CartContext = createContext<CartContextType | undefined>(undefined);

// Context provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, quantity = 1, configuration?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, configuration } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const basePrice = item.product.price;
      const configPrice = item.selectedConfiguration && item.product.configurations
        ? item.product.configurations.configurations.find(c => c.id === item.selectedConfiguration)?.price || 0
        : 0;
      return total + (basePrice + configPrice) * item.quantity;
    }, 0);
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
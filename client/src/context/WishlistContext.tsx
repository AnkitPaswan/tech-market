import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import type { WishlistItem } from '../types';

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; productId: string }
  | { type: 'REMOVE_FROM_WISHLIST'; productId: string };

interface WishlistContextType {
  state: WishlistState;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const initialState: WishlistState = {
  items: []
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.some(item => item.productId === action.productId)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { productId: action.productId }]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.productId)
      };

    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState, (initial) => {
    if (typeof window !== "undefined") {
      const persisted = localStorage.getItem("wishlist");
      return persisted ? JSON.parse(persisted) : initial;
    }
    return initial;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(state));
    }
  }, [state]);

  const addToWishlist = (productId: string) => {
    dispatch({ type: 'ADD_TO_WISHLIST', productId });
    toast.success("Item added to wishlist.");
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', productId });
    toast.info("Item removed from wishlist.");
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.productId === productId);
  };

  const value = {
    state,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

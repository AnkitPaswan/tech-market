export interface Product {
    _id: string;
    title: string | undefined;
    desc: string | undefined;
    img: string | undefined;
    categories: string;
    price: number;
    featured: boolean;
    inStock: boolean;
    rating: number;
    }
    
    export interface CartItem {
      product: Product;
      quantity: number;
    }
    
    export interface User {
      id: string;
      name: string;
      email: string;
    }
    
    export interface WishlistItem {
      productId: string;
    }
    
    export type SortOption = 'price-low' | 'price-high' | 'rating' | 'newest';
    
    export type ViewMode = 'grid' | 'list';
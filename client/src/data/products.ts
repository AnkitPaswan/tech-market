// import type { Product } from '../types';

// export const products: Product[] = [
//   {
//     id: '1',
//     name: 'Wireless Headphones',
//     price: 199.99,
//     description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and exceptional sound quality. Perfect for music lovers and professionals alike.',
//     imageUrl: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'audio',
//     featured: true,
//     inStock: true,
//     rating: 4.8
//   },
//   {
//     id: '2',
//     name: 'Smart Watch Series 5',
//     price: 299.99,
//     description: 'Advanced smartwatch with health monitoring, fitness tracking, and seamless connectivity with your smartphone. Water-resistant and long-lasting battery.',
//     imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'wearables',
//     featured: true,
//     inStock: true,
//     rating: 4.7
//   },
//   {
//     id: '3',
//     name: 'Ultra-Thin Laptop',
//     price: 1299.99,
//     description: 'Powerful yet lightweight laptop featuring the latest processor, ample storage, and stunning display. Perfect for professionals on the go.',
//     imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'computers',
//     featured: false,
//     inStock: true,
//     rating: 4.9
//   },
//   {
//     id: '4',
//     name: 'Wireless Earbuds',
//     price: 129.99,
//     description: 'True wireless earbuds with premium sound quality, active noise cancellation, and compact charging case. Perfect for workouts and daily use.',
//     imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'audio',
//     featured: false,
//     inStock: true,
//     rating: 4.5
//   },
//   {
//     id: '5',
//     name: 'Digital Camera Pro',
//     price: 799.99,
//     description: 'Professional-grade digital camera with 24MP sensor, 4K video recording, and interchangeable lenses. Capture memories in stunning detail.',
//     imageUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'cameras',
//     featured: true,
//     inStock: false,
//     rating: 4.6
//   },
//   {
//     id: '6',
//     name: 'Smart Home Hub',
//     price: 149.99,
//     description: 'Central hub for your smart home devices with voice control, automation capabilities, and seamless integration with popular smart home platforms.',
//     imageUrl: 'https://images.pexels.com/photos/4218546/pexels-photo-4218546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'smart-home',
//     featured: false,
//     inStock: true,
//     rating: 4.4
//   },
//   {
//     id: '7',
//     name: 'Portable Bluetooth Speaker',
//     price: 89.99,
//     description: 'Waterproof portable speaker with powerful bass, 20-hour battery life, and durable design. Perfect for outdoor adventures and parties.',
//     imageUrl: 'https://images.pexels.com/photos/191877/pexels-photo-191877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'audio',
//     featured: false,
//     inStock: true,
//     rating: 4.3
//   },
//   {
//     id: '8',
//     name: 'Gaming Console Pro',
//     price: 499.99,
//     description: 'Next-generation gaming console with stunning graphics, lightning-fast loading times, and an expansive game library. Take your gaming to the next level.',
//     imageUrl: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     category: 'gaming',
//     featured: true,
//     inStock: true,
//     rating: 4.9
//   }
// ];

// export const getProductById = (id: string): Product | undefined => {
//   return products.find(product => product.id === id);
// };

// export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
//   return products
//     .filter(p => p.category === product.category && p.id !== product.id)
//     .slice(0, limit);
// };

// export const getCategories = (): string[] => {
//   return [...new Set(products.map(product => product.category))];
// };

// export const getFeaturedProducts = (): Product[] => {
//   return products.filter(product => product.featured);
// };
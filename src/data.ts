export interface MenuItem {
  id: number;
  name: string;
  emoji: string;
  desc: string;
  price: number;
  cat: string;
  rating: number;
  badge: string | null;
}

export interface Order {
  id: string;
  items: string;
  total: number;
  status: 'Delivered' | 'Preparing' | 'Cancelled';
  date: string;
}

export const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Asian', 'Healthy', 'Drinks', 'Desserts'];

export const INITIAL_MENU: MenuItem[] = [
  { id: 1, name: 'Classic Smash Burger', emoji: '🍔', desc: 'Double smashed patty, American cheese, special sauce, pickles', price: 12.99, cat: 'Burgers', rating: 4.8, badge: 'BESTSELLER' },
  { id: 2, name: 'BBQ Bacon Bliss', emoji: '🥓', desc: 'Crispy bacon, BBQ sauce, caramelized onions, cheddar', price: 14.49, cat: 'Burgers', rating: 4.7, badge: null },
  { id: 3, name: 'Margherita Pizza', emoji: '🍕', desc: 'San Marzano tomato, fresh mozzarella, basil, EVOO', price: 13.99, cat: 'Pizza', rating: 4.9, badge: 'POPULAR' },
  { id: 4, name: 'Pepperoni Inferno', emoji: '🌶️', desc: 'Double pepperoni, spicy marinara, ghost pepper drizzle', price: 15.99, cat: 'Pizza', rating: 4.6, badge: 'HOT' },
  { id: 5, name: 'Pad Thai', emoji: '🍜', desc: 'Rice noodles, shrimp, egg, bean sprouts, peanuts, lime', price: 11.99, cat: 'Asian', rating: 4.7, badge: null },
  { id: 6, name: 'Spicy Ramen', emoji: '🍱', desc: 'Tonkotsu broth, chashu pork, soft egg, nori, scallions', price: 13.49, cat: 'Asian', rating: 4.8, badge: 'NEW' },
  { id: 7, name: 'Acai Power Bowl', emoji: '🥗', desc: 'Acai blend, granola, banana, strawberry, honey drizzle', price: 10.99, cat: 'Healthy', rating: 4.5, badge: null },
  { id: 8, name: 'Avocado Toast', emoji: '🥑', desc: 'Sourdough, smashed avocado, poached egg, red pepper flakes', price: 9.99, cat: 'Healthy', rating: 4.4, badge: null },
  { id: 9, name: 'Mango Lassi', emoji: '🥭', desc: 'Fresh mango, yogurt, milk, rose water, cardamom', price: 5.99, cat: 'Drinks', rating: 4.9, badge: 'POPULAR' },
  { id: 10, name: 'Chocolate Lava Cake', emoji: '🍫', desc: 'Warm molten chocolate center, vanilla ice cream', price: 7.99, cat: 'Desserts', rating: 4.8, badge: 'NEW' },
  { id: 11, name: 'Churros & Dip', emoji: '🍩', desc: 'Crispy churros with dulce de leche & chocolate sauce', price: 6.99, cat: 'Desserts', rating: 4.6, badge: null },
  { id: 12, name: 'Iced Matcha Latte', emoji: '🍵', desc: 'Ceremonial grade matcha, oat milk, vanilla syrup', price: 5.49, cat: 'Drinks', rating: 4.7, badge: null },
];

export const INITIAL_ORDERS: Order[] = [
  { id: '#ORD-1024', items: 'Smash Burger × 2, Mango Lassi × 1', total: 31.97, status: 'Delivered', date: 'May 28, 2025' },
  { id: '#ORD-1023', items: 'Margherita Pizza × 1, Lava Cake × 2', total: 29.97, status: 'Delivered', date: 'May 25, 2025' },
  { id: '#ORD-1022', items: 'Pad Thai × 2, Iced Matcha × 1', total: 29.47, status: 'Cancelled', date: 'May 20, 2025' },
  { id: '#ORD-1021', items: 'Spicy Ramen × 1, Acai Bowl × 1', total: 24.48, status: 'Preparing', date: 'Jun 04, 2025' },
];

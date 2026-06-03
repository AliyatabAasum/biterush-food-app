import { MenuItem } from '../data';
import FoodCard from './FoodCard';

interface WishlistPageProps {
  items: MenuItem[];
  wishlist: Set<number>;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export default function WishlistPage({ items, wishlist, onAddToCart, onToggleWishlist }: WishlistPageProps) {
  const wishItems = items.filter((x) => wishlist.has(x.id));

  return (
    <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Wishlist</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Items you've saved for later</p>

      {wishItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
          <div style={{ fontSize: 64 }}>❤️</div>
          <h3 style={{ fontSize: 20, color: '#fff', marginTop: 16, marginBottom: 8 }}>No saved items</h3>
          <p>Heart items on the menu to save them here</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {wishItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              inWishlist
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              reviewCount={100}
            />
          ))}
        </div>
      )}
    </div>
  );
}

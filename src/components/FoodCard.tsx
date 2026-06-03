import { MenuItem } from '../data';

interface FoodCardProps {
  item: MenuItem;
  inWishlist: boolean;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
  reviewCount: number;
}

export default function FoodCard({ item, inWishlist, onAddToCart, onToggleWishlist, reviewCount }: FoodCardProps) {
  return (
    <div
      className="food-card"
      style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'all .2s',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 64,
          position: 'relative',
          background: 'linear-gradient(135deg,#1e1e1e,#2a2a2a)',
        }}
      >
        {item.emoji}
        {item.badge && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: '#FF6B2C',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
            }}
          >
            {item.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(item.id); }}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: 'rgba(0,0,0,0.6)',
            border: 'none',
            color: '#fff',
            width: 32,
            height: 32,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s',
          }}
          className="wishlist-btn"
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#F1C40F', marginBottom: 8 }}>
          {'⭐'.repeat(Math.floor(item.rating))}
          <span style={{ color: '#888' }}>{item.rating} ({reviewCount})</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 12, lineHeight: 1.5 }}>{item.desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#FF6B2C' }}>${item.price.toFixed(2)}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(item.id); }}
            className="add-btn"
            title="Add to cart"
            style={{
              background: '#FF6B2C',
              border: 'none',
              color: '#fff',
              width: 34,
              height: 34,
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .2s',
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

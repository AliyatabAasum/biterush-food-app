import { useState, useMemo } from 'react';
import { MenuItem, CATEGORIES } from '../data';
import FoodCard from './FoodCard';

interface MenuPageProps {
  items: MenuItem[];
  wishlist: Set<number>;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

const reviewCounts: Record<number, number> = {};

export default function MenuPage({ items, wishlist, onAddToCart, onToggleWishlist }: MenuPageProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((it) => {
      const matchCat = activeFilter === 'All' || it.cat === activeFilter;
      const matchQ = it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q) || it.cat.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [items, search, activeFilter]);

  function getReviewCount(id: number) {
    if (!reviewCounts[id]) reviewCounts[id] = Math.floor(Math.random() * 200 + 50);
    return reviewCounts[id];
  }

  return (
    <div style={{ padding: '28px 24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>What are you craving?</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Fresh, hot, and delivered to your door 🚀</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes..."
          style={{
            flex: 1,
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 10,
            padding: '11px 16px',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#FF6B2C')}
          onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              background: cat === activeFilter ? 'rgba(255,107,44,0.15)' : '#1a1a1a',
              border: `1px solid ${cat === activeFilter ? '#FF6B2C' : '#2a2a2a'}`,
              borderRadius: 20,
              padding: '6px 16px',
              cursor: 'pointer',
              fontSize: 13,
              color: cat === activeFilter ? '#FF6B2C' : '#888',
              transition: 'all .2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ color: '#888', padding: 40, textAlign: 'center' }}>No items found 🍽️</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {filtered.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              inWishlist={wishlist.has(item.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              reviewCount={getReviewCount(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { MenuItem } from '../data';

interface CartPageProps {
  cart: Record<number, number>;
  items: MenuItem[];
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onRemove: (id: number) => void;
  onPlaceOrder: () => void;
  onBrowseMenu: () => void;
  showToast: (msg: string) => void;
}

export default function CartPage({ cart, items, onInc, onDec, onRemove, onPlaceOrder, onBrowseMenu, showToast }: CartPageProps) {
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const keys = Object.keys(cart).map(Number);

  const subtotal = keys.reduce((acc, id) => {
    const it = items.find((x) => x.id === id);
    return acc + (it ? it.price * cart[id] : 0);
  }, 0);
  const delivery = 2.99;
  const tax = subtotal * 0.08;
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + delivery + tax - promoDiscount;

  function applyPromo() {
    if (promoInput.trim().toUpperCase() === 'BITE10') {
      setPromoApplied(true);
      showToast('🎉 10% discount applied!');
    } else {
      showToast('❌ Invalid promo code');
    }
  }

  if (keys.length === 0) {
    return (
      <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Your Cart</h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Review your items before checkout</p>
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 8 }}>Your cart is empty</h3>
          <p>Add some delicious items from the menu!</p>
          <button
            onClick={onBrowseMenu}
            style={{
              background: '#FF6B2C',
              border: 'none',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 20,
              display: 'inline-block',
            }}
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Your Cart</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Review your items before checkout</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {keys.map((id) => {
            const it = items.find((x) => x.id === id);
            if (!it) return null;
            return (
              <div
                key={id}
                style={{
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: 12,
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div style={{ fontSize: 40, width: 56, textAlign: 'center' }}>{it.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{it.name}</div>
                  <div style={{ color: '#FF6B2C', fontWeight: 700 }}>${(it.price * cart[id]).toFixed(2)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <button
                      onClick={() => onDec(id)}
                      style={{ background: '#222', border: '1px solid #2a2a2a', color: '#fff', width: 28, height: 28, borderRadius: 6, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                    >−</button>
                    <span style={{ fontWeight: 700, fontSize: 15, minWidth: 24, textAlign: 'center' }}>{cart[id]}</span>
                    <button
                      onClick={() => onInc(id)}
                      style={{ background: '#222', border: '1px solid #2a2a2a', color: '#fff', width: 28, height: 28, borderRadius: 6, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                    >+</button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(id)}
                  style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer', fontSize: 18, padding: 4 }}
                >🗑</button>
              </div>
            );
          })}
        </div>

        <div
          style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 14,
            padding: 20,
            height: 'fit-content',
            position: 'sticky',
            top: 80,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Order Summary</h3>
          {[
            ['Subtotal', `$${subtotal.toFixed(2)}`],
            ['Delivery fee', `$${delivery.toFixed(2)}`],
            ['Tax (8%)', `$${tax.toFixed(2)}`],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', color: '#888' }}>
              <span>{label}</span><span>{val}</span>
            </div>
          ))}
          {promoApplied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', color: '#2ECC71' }}>
              <span>Promo (BITE10)</span><span>-${promoDiscount.toFixed(2)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, padding: '12px 0 6px', borderTop: '1px solid #2a2a2a', marginTop: 8, fontWeight: 700, color: '#fff' }}>
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', gap: 8, margin: '14px 0' }}>
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code (try BITE10)"
              style={{ flex: 1, background: '#222', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none' }}
            />
            <button
              onClick={applyPromo}
              style={{ background: '#FF6B2C', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
            >Apply</button>
          </div>

          <button
            onClick={onPlaceOrder}
            className="checkout-btn"
            style={{ background: '#FF6B2C', border: 'none', color: '#fff', width: '100%', padding: 14, borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 14, transition: 'all .2s' }}
          >
            Place Order 🚀
          </button>
          <p style={{ fontSize: 12, color: '#888', textAlign: 'center', marginTop: 10 }}>🔒 Secure checkout • Free returns</p>
        </div>
      </div>
    </div>
  );
}

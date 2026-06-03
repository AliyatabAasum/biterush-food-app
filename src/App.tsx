import { useState, useCallback, useRef } from 'react';
import { INITIAL_MENU, INITIAL_ORDERS, MenuItem, Order } from './data';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import OrdersPage from './components/OrdersPage';
import AdminPage from './components/AdminPage';
import Toast from './components/Toast';

type Page = 'menu' | 'cart' | 'wishlist' | 'orders' | 'admin';

export default function App() {
  const [page, setPage] = useState<Page>('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(INITIAL_MENU.length + 1);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message: msg, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }, []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  function addToCart(id: number) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const item = menuItems.find((x) => x.id === id);
    showToast(`✅ ${item?.name} added to cart!`);
  }

  function incCart(id: number) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function decCart(id: number) {
    setCart((c) => {
      if ((c[id] || 0) <= 1) {
        const next = { ...c };
        delete next[id];
        return next;
      }
      return { ...c, [id]: c[id] - 1 };
    });
  }

  function removeFromCart(id: number) {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }

  function toggleWishlist(id: number) {
    setWishlist((w) => {
      const next = new Set(w);
      const item = menuItems.find((x) => x.id === id);
      if (next.has(id)) {
        next.delete(id);
        showToast('💔 Removed from wishlist');
      } else {
        next.add(id);
        showToast(`❤️ ${item?.name} saved to wishlist!`);
      }
      return next;
    });
  }

  function placeOrder() {
    if (Object.keys(cart).length === 0) return;
    const itemStr = Object.entries(cart)
      .map(([id, qty]) => {
        const it = menuItems.find((x) => x.id === Number(id));
        return `${it?.name} × ${qty}`;
      })
      .join(', ');
    const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
      const it = menuItems.find((x) => x.id === Number(id));
      return acc + (it ? it.price * qty : 0);
    }, 0);
    const total = parseFloat((subtotal + 2.99 + subtotal * 0.08).toFixed(2));
    const newOrder: Order = {
      id: `#ORD-${1025 + orders.filter((o) => o.status === 'Preparing').length}`,
      items: itemStr,
      total,
      status: 'Preparing',
      date: 'Jun 04, 2025',
    };
    setOrders((o) => [newOrder, ...o]);
    setCart({});
    showToast('🎉 Order placed successfully!');
    setPage('orders');
  }

  function addItem(item: Omit<MenuItem, 'id'>) {
    const id = nextId.current++;
    setMenuItems((m) => [...m, { ...item, id }]);
  }

  function editItem(id: number, item: Omit<MenuItem, 'id'>) {
    setMenuItems((m) => m.map((x) => (x.id === id ? { ...item, id } : x)));
  }

  function deleteItem(id: number) {
    setMenuItems((m) => m.filter((x) => x.id !== id));
    removeFromCart(id);
    setWishlist((w) => { const next = new Set(w); next.delete(id); return next; });
  }

  const navItems: { key: Page; label: string }[] = [
    { key: 'menu', label: '🍽 Menu' },
    { key: 'wishlist', label: '❤️ Wishlist' },
    { key: 'orders', label: '📦 Orders' },
    { key: 'admin', label: '⚙️ Admin' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav style={{
        background: '#141414',
        borderBottom: '1px solid #2a2a2a',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div
          onClick={() => setPage('menu')}
          style={{ fontSize: 22, fontWeight: 800, color: '#FF6B2C', letterSpacing: '-0.5px', cursor: 'pointer' }}
        >
          🍔 Bite<span style={{ color: '#fff' }}>Rush</span>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              style={{
                background: page === key ? 'rgba(255,107,44,0.12)' : 'none',
                border: 'none',
                color: page === key ? '#FF6B2C' : '#888',
                padding: '8px 14px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                transition: 'all .2s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage('cart')}
          style={{
            background: '#FF6B2C',
            border: 'none',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all .2s',
          }}
          className="cart-btn"
        >
          🛒 Cart{' '}
          <span style={{
            background: '#fff',
            color: '#FF6B2C',
            borderRadius: '50%',
            width: 20,
            height: 20,
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {cartCount}
          </span>
        </button>
      </nav>

      {page === 'menu' && (
        <MenuPage
          items={menuItems}
          wishlist={wishlist}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
        />
      )}
      {page === 'cart' && (
        <CartPage
          cart={cart}
          items={menuItems}
          onInc={incCart}
          onDec={decCart}
          onRemove={removeFromCart}
          onPlaceOrder={placeOrder}
          onBrowseMenu={() => setPage('menu')}
          showToast={showToast}
        />
      )}
      {page === 'wishlist' && (
        <WishlistPage
          items={menuItems}
          wishlist={wishlist}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
        />
      )}
      {page === 'orders' && (
        <OrdersPage orders={orders} showToast={showToast} />
      )}
      {page === 'admin' && (
        <AdminPage
          items={menuItems}
          orders={orders}
          onAddItem={addItem}
          onEditItem={editItem}
          onDeleteItem={deleteItem}
          showToast={showToast}
        />
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

import { Order } from '../data';

interface OrdersPageProps {
  orders: Order[];
  showToast: (msg: string) => void;
}

const statusStyle: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: 'rgba(46,204,113,0.15)', color: '#2ECC71' },
  Preparing: { bg: 'rgba(255,107,44,0.15)', color: '#FF6B2C' },
  Cancelled: { bg: 'rgba(231,76,60,0.15)', color: '#E74C3C' },
};

export default function OrdersPage({ orders, showToast }: OrdersPageProps) {
  return (
    <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Your Orders</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Track and manage your past orders</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {orders.map((order) => {
          const st = statusStyle[order.status] || statusStyle.Delivered;
          return (
            <div key={order.id} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{order.id}</span>
                <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: st.bg, color: st.color }}>
                  {order.status}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>{order.items}</div>
              {order.status === 'Preparing' && (
                <>
                  <div style={{ height: 4, background: '#2a2a2a', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                    <div className="progress-fill" style={{ width: '45%' }} />
                  </div>
                  <p style={{ fontSize: 12, color: '#FF6B2C', marginTop: 6 }}>🍳 Kitchen is preparing your order...</p>
                </>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <span style={{ color: '#888', fontSize: 13 }}>{order.date}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#FF6B2C' }}>${order.total.toFixed(2)}</span>
                  <button
                    onClick={() => showToast('🛒 Items added to cart!')}
                    style={{
                      background: 'none',
                      border: '1px solid #FF6B2C',
                      color: '#FF6B2C',
                      padding: '6px 14px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      transition: 'all .2s',
                    }}
                    className="reorder-btn"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

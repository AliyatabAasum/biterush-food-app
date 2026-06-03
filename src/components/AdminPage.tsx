import { useState } from 'react';
import { MenuItem, Order } from '../data';

interface AdminPageProps {
  items: MenuItem[];
  orders: Order[];
  onAddItem: (item: Omit<MenuItem, 'id'>) => void;
  onEditItem: (id: number, item: Omit<MenuItem, 'id'>) => void;
  onDeleteItem: (id: number) => void;
  showToast: (msg: string) => void;
}

const CATS = ['Burgers', 'Pizza', 'Asian', 'Healthy', 'Drinks', 'Desserts'];

const statusPill: Record<string, string> = {
  Delivered: '#2ECC71',
  Preparing: '#FF6B2C',
  Cancelled: '#E74C3C',
};

function emptyForm() {
  return { name: '', emoji: '', desc: '', price: '', cat: 'Burgers', rating: '', badge: '' };
}

export default function AdminPage({ items, orders, onAddItem, onEditItem, onDeleteItem, showToast }: AdminPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm());

  const stats = [
    { icon: '💰', val: '$4,827', label: 'Total Revenue', change: '+12% this month' },
    { icon: '📦', val: orders.length, label: 'Total Orders', change: '+3 today' },
    { icon: '🍽️', val: items.length, label: 'Menu Items', change: 'Active catalog' },
    { icon: '⭐', val: '4.7', label: 'Avg Rating', change: 'Based on 847 reviews' },
  ];

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  }

  function openEdit(id: number) {
    const it = items.find((x) => x.id === id)!;
    setEditingId(id);
    setForm({ name: it.name, emoji: it.emoji, desc: it.desc, price: String(it.price), cat: it.cat, rating: String(it.rating), badge: it.badge || '' });
    setModalOpen(true);
  }

  function save() {
    if (!form.name.trim() || !form.price) { showToast('⚠️ Name and price are required'); return; }
    const payload: Omit<MenuItem, 'id'> = {
      name: form.name.trim(),
      emoji: form.emoji.trim() || '🍽️',
      desc: form.desc.trim(),
      price: parseFloat(form.price),
      cat: form.cat,
      rating: parseFloat(form.rating) || 4.5,
      badge: form.badge.trim() || null,
    };
    if (editingId !== null) {
      onEditItem(editingId, payload);
      showToast('✅ Item updated!');
    } else {
      onAddItem(payload);
      showToast('✅ Item added to menu!');
    }
    setModalOpen(false);
  }

  function del(id: number) {
    if (!confirm('Delete this item?')) return;
    onDeleteItem(id);
    showToast('🗑 Item deleted');
  }

  const inputStyle = {
    width: '100%',
    background: '#222',
    border: '1px solid #2a2a2a',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Admin Dashboard</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Manage your food ordering platform</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#2ECC71', marginTop: 4 }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Menu Items</h3>
          <button onClick={openAdd} style={{ background: '#FF6B2C', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>+ Add Item</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Item', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 600, borderBottom: '1px solid #2a2a2a' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>{it.emoji} {it.name}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(255,107,44,0.15)', color: '#FF6B2C' }}>{it.cat}</span>
                </td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>${it.price.toFixed(2)}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(46,204,113,0.15)', color: '#2ECC71' }}>In Stock</span>
                </td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => openEdit(it.id)} style={{ background: 'none', border: '1px solid #FF6B2C', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12, color: '#FF6B2C', transition: 'all .2s' }}>Edit</button>
                    <button onClick={() => del(it.id)} style={{ background: 'none', border: '1px solid #E74C3C', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12, color: '#E74C3C', transition: 'all .2s' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Recent Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Order ID', 'Items', 'Total', 'Status', 'Date'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 600, borderBottom: '1px solid #2a2a2a' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const color = statusPill[o.status] || '#888';
              const bg = o.status === 'Delivered' ? 'rgba(46,204,113,0.15)' : o.status === 'Preparing' ? 'rgba(255,107,44,0.15)' : 'rgba(231,76,60,0.15)';
              return (
                <tr key={o.id}>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>{o.id}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>${o.total.toFixed(2)}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a' }}>
                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: bg, color }}>{o.status}</span>
                  </td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #2a2a2a', color: '#888', fontSize: 12 }}>{o.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28, width: 480, maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Item Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Margherita Pizza" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Emoji</label>
                <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🍕" style={{ ...inputStyle, width: 80 }} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Description</label>
              <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Short description..." style={{ ...inputStyle, height: 80, resize: 'none' } as React.CSSProperties} />
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Price ($)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="9.99" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Category</label>
                <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} style={inputStyle}>
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Rating</label>
                <input type="number" min={1} max={5} step={0.1} value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} placeholder="4.5" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Badge (optional)</label>
                <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="HOT / NEW / SALE" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', padding: '10px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
              <button onClick={save} style={{ background: '#FF6B2C', border: 'none', color: '#fff', padding: '10px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Save Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

export const AdminOrders = () => {
  const { orders, setOrders, addToast } = useShop();

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const nextStatus = o.status === 'Processing' ? 'Shipped' : o.status === 'Shipped' ? 'Delivered' : 'Processing';
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
    addToast('Order status updated', 'success');
  };

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Fulfillment Center</span>
          <h1 className="text-3xl font-black uppercase text-white">ALL CLIENT ORDERS</h1>
        </div>
        <Link
          to="/admin/dashboard"
          className="glass-panel text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:bg-white/10"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="overflow-x-auto glass-panel rounded-3xl border border-white/10">
        <table className="w-full text-xs text-left text-gray-300">
          <thead className="bg-white/5 text-gray-400 font-semibold uppercase">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items Count</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Fulfill Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-white/5">
                <td className="p-4 font-bold text-white">{o.id}</td>
                <td className="p-4 text-gray-400">{o.date}</td>
                <td className="p-4">{o.items.length} items</td>
                <td className="p-4 font-bold text-luxury-gold">₹{o.total}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40">
                    {o.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(o.id)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-luxury-gold hover:text-black font-bold rounded-lg transition-colors text-[11px]"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

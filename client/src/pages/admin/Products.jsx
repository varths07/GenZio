import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProducts = () => {
  const { products, setProducts, addToast } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product deleted from store catalog', 'info');
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

  <div>
    <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">
      Catalog Manager
    </span>

    <h1 className="text-3xl font-black uppercase text-white">
      ALL PRODUCTS ({products.length})
    </h1>
  </div>

  <div className="flex gap-3">

    <Link
      to="/admin/add-product"
      className="bg-luxury-gold text-black font-bold px-5 py-3 rounded-xl hover:opacity-90 transition"
    >
      <Plus className="w-4 h-4 inline mr-2" />
      Add Product
    </Link>

    <Link
      to="/admin/dashboard"
      className="glass-panel text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:bg-white/10"
    >
      Back to Dashboard
    </Link>

  </div>

</div>

      {/* Search Filter */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center space-x-3">
        <Search className="w-5 h-5 text-luxury-gold" />
        <input
          type="text"
          placeholder="Filter catalog by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto glass-panel rounded-3xl border border-white/10">
        <table className="w-full text-xs text-left text-gray-300">
          <thead className="bg-white/5 text-gray-400 font-semibold uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Sub-Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="p-4 flex items-center space-x-3">
                  <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg bg-black/60" />
                  <span className="font-bold text-white line-clamp-1">{p.name}</span>
                </td>
                <td className="p-4 text-luxury-gold font-bold">{p.category}</td>
                <td className="p-4">{p.subCategory}</td>
                <td className="p-4 font-bold text-white">₹{p.price}</td>
                <td className="p-4">{p.stockCount} left</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
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

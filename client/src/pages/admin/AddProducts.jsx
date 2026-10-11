import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

export const AddProducts = () => {

  const { products, setProducts, addToast } = useShop();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    stockCount: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      price: Number(product.price),
      stockCount: Number(product.stockCount),
      images: [
        product.image ||
          "https://via.placeholder.com/300x400?text=Product",
      ],
    };

    setProducts([...products, newProduct]);

    addToast("Product Added Successfully", "success");

    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-8 border border-white/10">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black uppercase">
            Add New Product
          </h1>

          <Link
            to="/admin/products"
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20"
          >
            Back
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            type="text"
            name="subCategory"
            placeholder="Sub Category"
            value={product.subCategory}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            type="number"
            name="stockCount"
            placeholder="Stock"
            value={product.stockCount}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <button
            type="submit"
            className="w-full bg-luxury-gold text-black font-bold py-3 rounded-xl hover:opacity-90"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};
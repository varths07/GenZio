
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { supabase } from "../../supabase";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export const AddProducts = () => {
  const { setProducts, addToast } = useShop();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    stockCount: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setError("Unable to read this image. Please try again.");
        return;
      }

      setProduct((prev) => ({
        ...prev,
        image: reader.result,
      }));

      setSelectedFile(file);
      setImageName(file.name);
    };

    reader.onerror = () => {
      setError("Unable to read this image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProduct((prev) => ({
      ...prev,
      image: "",
    }));

    setSelectedFile(null);
    setImageName("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;

    const name = product.name.trim();
    const category = product.category.trim();
    const subCategory = product.subCategory.trim();
    const price = Number(product.price);
    const stockCount = Number(product.stockCount);

    if (!name || !category || !subCategory) {
      setError("Please fill in all product details.");
      return;
    }

    if (
      product.price === "" ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError("Please enter a valid price greater than zero.");
      return;
    }

    if (
      product.stockCount === "" ||
      !Number.isInteger(stockCount) ||
      stockCount < 0
    ) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    if (!selectedFile || !product.image) {
      setError("Please upload a product image.");
      return;
    }

    setIsSubmitting(true);

    let uploadedImagePath = null;

    try {
      // Confirm the user has an active Supabase session.
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Please log in again before adding a product.");
      }

      // Generate a unique image filename.
      const safeFileName = selectedFile.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      const imagePath =
        `products/${crypto.randomUUID()}-${safeFileName}`;

      // Upload the image to Supabase Storage.
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(imagePath, selectedFile, {
          contentType: selectedFile.type,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      uploadedImagePath = imagePath;

      // Get the public URL of the uploaded image.
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("product-images")
        .getPublicUrl(imagePath);

      // Save product details using the actual database column names.
      const { data: savedProduct, error: insertError } = await supabase
        .from("products")
        .insert({
          name,
          description: "",
          price,
          stock: stockCount,
          category,
          sub_category: subCategory,
          image_url: publicUrl,
          is_active: true,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Update the local product list after the database save succeeds.
      setProducts((prev) => [
        {
          ...savedProduct,
          stockCount: savedProduct.stock,
          image: savedProduct.image_url,
          images: [savedProduct.image_url],
          subCategory: savedProduct.sub_category,
        },
        ...prev,
      ]);

      addToast("Product Added Successfully", "success");
      navigate("/admin/products");
    } catch (err) {
      console.error("Add product error:", err);

      // Remove the uploaded image if saving the product failed.
      if (uploadedImagePath) {
        const { error: cleanupError } = await supabase.storage
          .from("product-images")
          .remove([uploadedImagePath]);

        if (cleanupError) {
          console.error("Image cleanup error:", cleanupError);
        }
      }

      setError(
        err?.message ||
          "Unable to add product. Please check your permissions and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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

        <form onSubmit={handleSubmit} className="space-y-5">
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
            min="0.01"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            type="number"
            name="stockCount"
            placeholder="Stock"
            min="0"
            step="1"
            value={product.stockCount}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-300">
              Product Image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {product.image ? (
              <div className="relative w-full max-w-sm">
                <img
                  src={product.image}
                  alt="Product preview"
                  className="w-full h-64 object-contain rounded-xl border border-white/10 bg-black/40"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-600 text-white"
                  aria-label="Remove image"
                >
                  <X size={18} />
                </button>

                <p className="mt-2 text-sm text-gray-400 break-all">
                  {imageName}
                </p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center">
                <ImageIcon
                  size={40}
                  className="mx-auto mb-3 text-gray-400"
                />

                <p className="text-sm text-gray-300 mb-4">
                  Upload a photo of your product
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-luxury-gold text-black font-bold hover:opacity-90"
                >
                  <Upload size={18} />
                  Choose Image
                </button>

                <p className="mt-3 text-xs text-gray-500">
                  JPG, PNG, or WebP · Maximum 5 MB
                </p>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-luxury-gold text-black font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

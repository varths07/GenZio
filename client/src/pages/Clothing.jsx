import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Clothing = () => {
  const { storefrontProducts } = useShop();
  const products = storefrontProducts.filter(
    (product) => product.category?.toLowerCase() === "clothing"
  );

  return (
    <CollectionPage
      eyebrow="The clothing edit"
      title="Clothing for men"
      description="Everyday layers, relaxed shirts, denim and wardrobe essentials."
      products={products}
    />
  );
};

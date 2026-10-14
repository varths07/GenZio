import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Footwear = () => {
  const { storefrontProducts } = useShop();
  const products = storefrontProducts.filter(
    (product) => product.category?.toLowerCase() === "footwear"
  );

  return (
    <CollectionPage
      eyebrow="The footwear edit"
      title="Men's footwear"
      description="Explore shoes from the GenZio collection."
      products={products}
      emptyMessage="Footwear is not available in the current collection."
    />
  );
};

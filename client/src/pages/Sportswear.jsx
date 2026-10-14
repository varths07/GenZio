import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Sportswear = () => {
  const { storefrontProducts } = useShop();
  const products = storefrontProducts.filter(
    (product) => product.category?.toLowerCase() === "sportswear"
  );

  return (
    <CollectionPage
      eyebrow="The active edit"
      title="Men's sportswear"
      description="Browse sportswear and active pieces from the GenZio collection."
      products={products}
      emptyMessage="Sportswear is not available in the current collection."
    />
  );
};

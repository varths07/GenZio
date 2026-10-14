import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Sneakers = () => {
  const { storefrontProducts } = useShop();
  const products = storefrontProducts.filter((product) =>
    ["sneakers", "running shoes"].includes(
      product.subCategory?.toLowerCase()
    )
  );

  return (
    <CollectionPage
      eyebrow="The footwear edit"
      title="Sneakers & running shoes"
      description="Discover sneakers and running shoes from the GenZio collection."
      products={products}
      emptyMessage="Sneakers are not available in the current collection."
    />
  );
};

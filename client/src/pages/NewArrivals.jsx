import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const NewArrivals = () => {
  const { storefrontProducts } = useShop();
  const products = [...storefrontProducts]
    .filter((product) => product.isNew || product.isDemo)
    .sort((first, second) => {
      if (Boolean(first.isDemo) !== Boolean(second.isDemo)) {
        return first.isDemo ? 1 : -1;
      }
      return new Date(second.created_at || 0) - new Date(first.created_at || 0);
    });

  return (
    <CollectionPage
      eyebrow="Just added"
      title="New arrivals"
      description="The latest pieces in the GenZio menswear edit."
      products={products}
      emptyMessage="There are no new arrivals at the moment."
    />
  );
};

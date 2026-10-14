import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Wishlist = () => {
  const { wishlist } = useShop();

  return (
    <CollectionPage
      eyebrow="Saved for later"
      title="Your wishlist"
      description="The pieces you have saved while browsing."
      products={wishlist}
      emptyMessage="You have not saved any pieces yet."
    />
  );
};

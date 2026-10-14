import React from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Sale = () => {
  const { products } = useShop();
  const saleProducts = products.filter(
    (product) => product.isFlashSale || Number(product.discountPercent) > 0
  );

  return (
    <CollectionPage
      eyebrow="Offers"
      title="Sale"
      description="See current offers on available GenZio products."
      products={saleProducts}
      emptyMessage="There are no current offers."
    />
  );
};

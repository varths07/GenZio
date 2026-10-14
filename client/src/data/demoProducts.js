const imageUrl = (photoId) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&h=1125&q=82`;

const standardSizes = ["S", "M", "L", "XL"];

const createDemoProduct = ({
  id,
  name,
  price,
  subCategory,
  description,
  image,
  color,
  colorHex,
}) => ({
  id: `demo-${id}`,
  name,
  price,
  description,
  category: "Clothing",
  subCategory,
  image: imageUrl(image),
  images: [imageUrl(image)],
  colors: [{ name: color, hex: colorHex }],
  sizes: standardSizes,
  isNew: true,
  isDemo: true,
});

export const DEMO_PRODUCTS = [
  createDemoProduct({
    id: "essential-black-tee",
    name: "Essential Black Oversized T-Shirt",
    price: 699,
    subCategory: "T-Shirts",
    description:
      "A relaxed-fit black tee with a clean crew neckline, prepared as an illustrative GenZio demo product.",
    image: "photo-1583743814966-8936f5b7be1a",
    color: "Black",
    colorHex: "#242424",
  }),
  createDemoProduct({
    id: "premium-white-tee",
    name: "Premium White Crew-Neck T-Shirt",
    price: 599,
    subCategory: "T-Shirts",
    description:
      "A versatile white crew-neck tee with an easy everyday shape, prepared as an illustrative GenZio demo product.",
    image: "photo-1521572163474-6864f9cf17ab",
    color: "White",
    colorHex: "#f5f3ee",
  }),
  createDemoProduct({
    id: "graphic-streetwear-tee",
    name: "Graphic Streetwear T-Shirt",
    price: 799,
    subCategory: "T-Shirts",
    description:
      "A graphic-led streetwear tee with a relaxed silhouette, prepared as an illustrative GenZio demo product.",
    image: "photo-1576566588028-4147f3842f27",
    color: "Charcoal",
    colorHex: "#41413d",
  }),
  createDemoProduct({
    id: "beige-relaxed-shirt",
    name: "Relaxed-Fit Beige Shirt",
    price: 1199,
    subCategory: "Shirts",
    description:
      "A soft-toned relaxed shirt that layers easily across the week, prepared as an illustrative GenZio demo product.",
    image: "photo-1603252109303-2751441dd157",
    color: "Sand",
    colorHex: "#c7b99f",
  }),
  createDemoProduct({
    id: "classic-black-shirt",
    name: "Classic Black Casual Shirt",
    price: 999,
    subCategory: "Shirts",
    description:
      "A straightforward black casual shirt with a considered everyday fit, prepared as an illustrative GenZio demo product.",
    image: "photo-1598033129183-c4f50c736f10",
    color: "Black",
    colorHex: "#242424",
  }),
  createDemoProduct({
    id: "olive-overshirt",
    name: "Textured Olive Overshirt",
    price: 1299,
    subCategory: "Overshirts",
    description:
      "An olive overshirt for light layering and easy outfits, prepared as an illustrative GenZio demo product.",
    image: "photo-1591047139829-d91aecb6caea",
    color: "Olive",
    colorHex: "#555442",
  }),
  createDemoProduct({
    id: "straight-blue-jeans",
    name: "Straight-Fit Blue Jeans",
    price: 1499,
    subCategory: "Jeans",
    description:
      "Straight-fit blue denim with a versatile shape, prepared as an illustrative GenZio demo product.",
    image: "photo-1542272604-787c3835535d",
    color: "Indigo",
    colorHex: "#334967",
  }),
  createDemoProduct({
    id: "black-cargo-pants",
    name: "Relaxed Black Cargo Pants",
    price: 1299,
    subCategory: "Trousers",
    description:
      "Relaxed black utility trousers with a practical, contemporary silhouette, prepared as an illustrative GenZio demo product.",
    image: "photo-1517445312882-bc9910d016b7",
    color: "Black",
    colorHex: "#242424",
  }),
  createDemoProduct({
    id: "beige-trousers",
    name: "Everyday Beige Trousers",
    price: 1199,
    subCategory: "Trousers",
    description:
      "Easy-to-style beige trousers with a clean everyday profile, prepared as an illustrative GenZio demo product.",
    image: "photo-1594938298603-c8148c4dae35",
    color: "Beige",
    colorHex: "#c8bda8",
  }),
  createDemoProduct({
    id: "premium-cotton-polo",
    name: "Premium Cotton Polo",
    price: 899,
    subCategory: "Polos",
    description:
      "A smart-casual cotton polo with a simple collar and easy fit, prepared as an illustrative GenZio demo product.",
    image: "photo-1602810318383-e386cc2a3ccf",
    color: "Forest",
    colorHex: "#354c3c",
  }),
  createDemoProduct({
    id: "minimal-hoodie",
    name: "Minimal Hoodie",
    price: 1499,
    subCategory: "Hoodies",
    description:
      "A minimal hoodie for comfortable layering, prepared as an illustrative GenZio demo product.",
    image: "photo-1556821840-3a63f95609a7",
    color: "Stone",
    colorHex: "#aaa69b",
  }),
  createDemoProduct({
    id: "casual-coord-set",
    name: "Casual Co-ord Set",
    price: 1799,
    subCategory: "Co-ord Sets",
    description:
      "A coordinated casual set designed to make getting dressed straightforward, prepared as an illustrative GenZio demo product.",
    image: "photo-1618354691373-d851c5c3a990",
    color: "Charcoal",
    colorHex: "#41413d",
  }),
];

// Set VITE_ENABLE_DEMO_PRODUCTS=false to disable fixtures. They default on in
// development and off in production; demo items are never eligible for checkout.
export const DEMO_PRODUCTS_ENABLED =
  import.meta.env.VITE_ENABLE_DEMO_PRODUCTS === "true" ||
  (import.meta.env.VITE_ENABLE_DEMO_PRODUCTS !== "false" &&
    import.meta.env.DEV);

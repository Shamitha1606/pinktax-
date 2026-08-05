import productA from "@/assets/product-a.jpg";
import productB from "@/assets/product-b.jpg";
import productC from "@/assets/product-c.jpg";
import productD from "@/assets/product-d.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  fairness: number;
  rating: number;
  reviews: number;
  similarity: number;
  weight: string;
  quantity: string;
  ingredients: string;
  features: string;
  brandValue: string;
};

export const analyzedProduct: Product = {
  id: "a",
  name: "Premium Product A",
  brand: "Brand Name",
  image: productA,
  price: 240,
  originalPrice: 240,
  fairness: 42,
  rating: 4.1,
  reviews: 1284,
  similarity: 100,
  weight: "500 g",
  quantity: "1 unit",
  ingredients: "12 listed · 2 additives",
  features: "Core set",
  brandValue: "Premium markup",
};

export const alternatives: Product[] = [
  {
    id: "b",
    name: "Product B",
    brand: "ValueLab",
    image: productB,
    price: 198,
    originalPrice: 240,
    fairness: 85,
    rating: 4.6,
    reviews: 3120,
    similarity: 98,
    weight: "500 g",
    quantity: "1 unit",
    ingredients: "12 listed · 0 additives",
    features: "Core set + refill cap",
    brandValue: "Fair pricing",
  },
  {
    id: "c",
    name: "Product C",
    brand: "Northline",
    image: productC,
    price: 215,
    originalPrice: 240,
    fairness: 74,
    rating: 4.4,
    reviews: 1890,
    similarity: 94,
    weight: "480 g",
    quantity: "1 unit",
    ingredients: "11 listed · 1 additive",
    features: "Core set",
    brandValue: "Balanced",
  },
  {
    id: "d",
    name: "Product D",
    brand: "Amberly",
    image: productD,
    price: 220,
    originalPrice: 240,
    fairness: 69,
    rating: 4.2,
    reviews: 940,
    similarity: 91,
    weight: "520 g",
    quantity: "1 unit",
    ingredients: "13 listed · 2 additives",
    features: "Core set + travel size",
    brandValue: "Mid-tier",
  },
];

export const bestAlternative: Product = alternatives[0]!;

export const trustMetrics = [
  { label: "Customer Rating", value: 92, display: "4.6 / 5" },
  { label: "AI Confidence Score", value: 96, display: "96%" },
  { label: "Similar Products Found", value: 78, display: "1,284" },
  { label: "Price Accuracy", value: 89, display: "89%" },
];

export const comparisonFields: {
  label: string;
  key: keyof Product;
  winner: "original" | "alternative";
}[] = [
  { label: "Price", key: "price", winner: "alternative" },
  { label: "Weight", key: "weight", winner: "original" },
  { label: "Quantity", key: "quantity", winner: "original" },
  { label: "Ingredients", key: "ingredients", winner: "alternative" },
  { label: "Features", key: "features", winner: "alternative" },
  { label: "Brand Value", key: "brandValue", winner: "alternative" },
  { label: "Rating", key: "rating", winner: "alternative" },
  { label: "Fairness Score", key: "fairness", winner: "alternative" },
];

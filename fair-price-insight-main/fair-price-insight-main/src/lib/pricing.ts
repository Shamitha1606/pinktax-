export type ProductDraft = {
  name: string;
  brand: string;
  price: string;
  weight: string;
  quantity: string;
  category: string;
  ingredients: string;
  features: string;
  description: string;
};

export const emptyDraft: ProductDraft = {
  name: "",
  brand: "",
  price: "",
  weight: "",
  quantity: "",
  category: "",
  ingredients: "",
  features: "",
  description: "",
};

export const categories = [
  "Packaged Food",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Health & Wellness",
  "Baby Care",
  "Electronics Accessories",
];

export const processingSteps = [
  "Collecting Product Information",
  "Analysing Product Description using NLP",
  "Finding Similar Products using Machine Learning",
  "Calculating Similarity Score",
  "Predicting Fair Price",
  "Generating AI Explanation",
];

export type SimilarProduct = {
  name: string;
  brand: string;
  price: number;
  weight: string;
  quantity: string;
  features: string;
  ingredients: string;
  similarity: number;
};

export type AnalysisResult = {
  currentPrice: number;
  fairPrice: number;
  differencePct: number;
  similarityScore: number;
  fairnessScore: number;
  confidence: number;
  decision: string;
  explanation: string;
  highlights: string[];
  product: {
    name: string;
    brand: string;
    weight: string;
    quantity: string;
    features: string;
    ingredients: string;
  };
  similar: SimilarProduct[];
  factors: { factor: string; impact: number }[];
};

export function buildResult(draft: ProductDraft): AnalysisResult {
  const currentPrice = Number(draft.price) > 0 ? Number(draft.price) : 240;
  const fairPrice = Math.round(currentPrice * 0.854);
  const differencePct = Math.round(((currentPrice - fairPrice) / fairPrice) * 100);

  return {
    currentPrice,
    fairPrice,
    differencePct,
    similarityScore: 96,
    fairnessScore: 42,
    confidence: 91,
    decision: "Possible unfair pricing detected.",
    explanation:
      "This product is highly similar to another product with identical specifications. The higher price appears to be influenced mainly by branding and packaging rather than additional product features.",
    highlights: ["highly similar", "identical specifications", "branding", "packaging"],
    product: {
      name: draft.name || "Premium Almond Butter",
      brand: draft.brand || "NutriCraft",
      weight: draft.weight || "500 g",
      quantity: draft.quantity || "1 jar",
      features: draft.features || "No added sugar, cold pressed, glass jar",
      ingredients: draft.ingredients || "Roasted almonds (100%)",
    },
    similar: [
      {
        name: "Classic Almond Butter",
        brand: "GreenHarvest",
        price: Math.round(currentPrice * 0.83),
        weight: draft.weight || "500 g",
        quantity: "1 jar",
        features: "No added sugar, cold pressed",
        ingredients: "Roasted almonds (100%)",
        similarity: 96,
      },
      {
        name: "Almond Spread Natural",
        brand: "PureNest",
        price: Math.round(currentPrice * 0.87),
        weight: draft.weight || "500 g",
        quantity: "1 jar",
        features: "Cold pressed, recyclable jar",
        ingredients: "Almonds (99%), sea salt",
        similarity: 91,
      },
      {
        name: "Everyday Almond Butter",
        brand: "FarmLine",
        price: Math.round(currentPrice * 0.79),
        weight: draft.weight || "450 g",
        quantity: "1 jar",
        features: "No preservatives",
        ingredients: "Almonds (98%), salt",
        similarity: 84,
      },
    ],
    factors: [
      { factor: "Product Similarity", impact: 92 },
      { factor: "Historical Prices", impact: 68 },
      { factor: "Feature Differences", impact: 24 },
      { factor: "Brand Premium", impact: 81 },
      { factor: "Category Average", impact: 57 },
      { factor: "Quantity Difference", impact: 18 },
    ],
  };
}

export function fairnessBand(score: number) {
  if (score >= 80)
    return { label: "Fair Pricing", tone: "success" as const, badge: "Fair" };
  if (score >= 60)
    return { label: "Slight Premium", tone: "warning" as const, badge: "Premium" };
  if (score >= 40)
    return {
      label: "Potential Overpricing",
      tone: "warning" as const,
      badge: "Overpriced",
    };
  return { label: "Likely Unfair Pricing", tone: "danger" as const, badge: "Unfair" };
}

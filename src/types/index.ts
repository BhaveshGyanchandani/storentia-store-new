export interface Product {
  id: string;
  productTitle: string;
  productDescription: string;
  brand: string;
  category: string;
  subcategory?: string;
  originalPrice?: number;
  sellingPrice: number;
  discount?: number;
  skuCode: string;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  productImages: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  availability: "in-stock" | "low-stock" | "out-of-stock";
}

export interface CartLine {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
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

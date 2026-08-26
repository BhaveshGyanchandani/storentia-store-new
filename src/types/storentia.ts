// These mirror the shapes shown in the Storentia docs (Products, Variants,
// Cart). If the real @storentia/sdk package exports its own types, prefer
// importing those instead — check node_modules/@storentia/sdk/dist/*.d.ts
// after you run `npm install`. This file is a safe fallback so the app is
// fully typed even before you've confirmed the exact SDK shapes.

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  currency: string;
  available: boolean;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  images: string[];
  price: number;
  currency: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  variants?: ProductVariant[];
}

export interface PageInfo {
  page: number;
  limit: number;
  totalPages?: number;
  totalItems?: number;
}

export interface ProductListResponse {
  data: Product[];
  pageInfo: PageInfo;
}

export interface CartLineItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  id: string;
  items: CartLineItem[];
  subtotal: number;
  currency: string;
}

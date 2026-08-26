// Storentia's dashboard (Settings > API Tokens) issues a ready-to-use
// API token directly — there's no clientId/clientSecret exchange on our
// end. We send that token as a static Bearer header on every request.
// (The docs' OAuth2 client-credentials section describes how the SDK
// itself gets a token internally when using clientId/clientSecret; since
// the dashboard gave us a token instead, we use setAccessToken()'s model —
// a pre-obtained token — rather than reimplementing that exchange.)
//
// STILL TO CONFIRM: whether this token expires and needs manual renewal
// from the dashboard, since we have no expiresIn value to auto-refresh
// against. Check the API Tokens page for an expiry date/renewal option.

import { Product, ProductListResponse } from '../types/storentia';

// In dev this goes through the Vite proxy (see vite.config.ts) to avoid
// CORS; in production it hits the real URL directly (you'll need a real
// backend proxy for that later — see README).
const BASE_URL = import.meta.env.DEV
  ? '/storentia-api/graphql'
  : (import.meta.env.VITE_STORENTIA_API_URL as string);

const storeId = import.meta.env.VITE_STORENTIA_STORE_ID as string;

// The dashboard's API Tokens page issues a ready-to-use token directly —
// no clientId/clientSecret exchange needed on our end. This matches the
// SDK docs' storentia.setAccessToken(token) path ("pre-obtained token").
const apiToken = import.meta.env.VITE_STORENTIA_API_TOKEN as string;

async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Storentia API error ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Storentia GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

interface ListOpts {
  status?: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  pagination?: { page: number; limit: number };
}

export const storentia = {
  products: {
    async get(id: string): Promise<Product> {
      const data = await graphql<{ product: Product }>(
        `query GetProduct($storeId: ID!, $id: ID!) {
          product(storeId: $storeId, id: $id) {
            id title description images price currency status
            variants { id title price currency available }
          }
        }`,
        { storeId, id }
      );
      return data.product;
    },
    async list(opts: ListOpts = {}): Promise<ProductListResponse> {
      const data = await graphql<{ products: ProductListResponse }>(
        `query ListProducts($storeId: ID!, $status: String, $page: Int, $limit: Int) {
          products(storeId: $storeId, status: $status, page: $page, limit: $limit) {
            data { id title description images price currency status
              variants { id title price currency available } }
            pageInfo { page limit totalPages totalItems }
          }
        }`,
        {
          storeId,
          status: opts.status,
          page: opts.pagination?.page,
          limit: opts.pagination?.limit,
        }
      );
      return data.products;
    },
  },
};

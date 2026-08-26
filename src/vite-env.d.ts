/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORENTIA_API_URL: string;
  readonly VITE_STORENTIA_CLIENT_ID: string;
  readonly VITE_STORENTIA_CLIENT_SECRET: string;
  readonly VITE_STORENTIA_STORE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

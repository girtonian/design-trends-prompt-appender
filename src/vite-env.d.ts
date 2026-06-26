/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRO_CHECKOUT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FALLBACK_LOCALE: string;
    readonly VITE_BASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
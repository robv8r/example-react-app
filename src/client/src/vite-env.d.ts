/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADFS_CLIENT_ID: string;
    readonly VITE_ADFS_AUTHORITY: string;
    readonly VITE_ADFS_DOMAIN_HINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

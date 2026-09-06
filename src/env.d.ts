import "../.astro/types.d.ts";

/// <reference types="astro/client" />

declare global {
  interface Window {
    si: any;
    siq: any;
    va: any;
    vaq: any;
  }
}

/**
 * Prefixes the deploy base path to files in /public. Next does not add `basePath` to string
 * image sources, so every "/images/..." path goes through this (empty locally, "/repo" on GitHub Pages).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;

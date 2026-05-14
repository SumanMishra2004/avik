import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

const isDev = process.env.NODE_ENV === "development";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Never use CDN in dev — always fetch fresh from the API
  useCdn: !isDev,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: { enabled: false },
});

/**
 * ISR-aware fetch helper.
 * - Development: cache: 'no-store' → always fresh on every request
 * - Production:  next.revalidate  → ISR with configurable TTL
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate: number | false = 10
): Promise<T> {
  if (isDev) {
    // In development, always bypass cache so Studio changes show immediately
    return sanityClient.fetch<T>(query, params, {
      cache: "no-store",
    });
  }

  // Production: use ISR
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate },
  });
}

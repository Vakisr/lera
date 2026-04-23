import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default Cloudflare Workers adapter for Next.js. Uses the built-in
// in-memory cache and no incremental static regeneration, which is fine
// for this flow where every route is either static HTML or a simple API
// stub. Layer on KV / R2 if we start doing server-rendered data later.
export default defineCloudflareConfig();

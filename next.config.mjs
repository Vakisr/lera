/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode double-invokes renders and animations in dev, which wedges
  // framer-motion's AnimatePresence `mode="wait"` initial animation. Disabled
  // so the dev experience matches production behavior.
  reactStrictMode: false,
};

export default nextConfig;

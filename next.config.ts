import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async headers() {
    const csp = [
      "default-src 'self'",
      // Scripts needed for Clerk and Cloudflare Turnstile widget
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.clerk.services https://challenges.cloudflare.com",
      // Styles (Next.js inlines some styles; allow Google Fonts if used)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images and media
      "img-src 'self' data: blob: https://*.clerk.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // XHR/Fetch/WebSocket endpoints
      "connect-src 'self' https://*.clerk.com https://*.clerk.services https://challenges.cloudflare.com https://o449981.ingest.us.sentry.io",
      // Iframes (Clerk and Cloudflare widgets)
      "frame-src https://*.clerk.com https://challenges.cloudflare.com",
      // Workers
      "worker-src 'self' blob:",
      // Form submissions
      "form-action 'self' https://*.clerk.com",
      // Lock down base-uri
      "base-uri 'self'",
      // Disallow other apps embedding this site
      "frame-ancestors 'self'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          // Keep Permissions-Policy minimal to avoid browser warnings about unknown features
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // Enable HSTS in production environments behind HTTPS (adjust max-age if desired)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },
});

export default nextConfig;

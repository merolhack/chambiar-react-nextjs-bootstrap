/** @type {import('next').NextConfig} */

const backendHost = process.env.NEXT_PUBLIC_API_HOST || 'https://chambiar-prod-backend-app-563127813488.us-central1.run.app';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data:;
      font-src 'self' data: https://fonts.gstatic.com;
      connect-src 'self' ${backendHost};
      frame-src 'none';
      object-src 'none';
    `.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig = {
  // For Static Export
  // output: 'export',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/connections',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const apiHost = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname
  : null;

const isLocalApi =
  !process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL.includes('localhost') ||
  process.env.NEXT_PUBLIC_API_BASE_URL.includes('127.0.0.1');

const nextConfig = {
async redirects() {
  return [
    // old contact
    { source: '/contact', destination: '/contact-us', permanent: true },
    
    // old commercial pages → commercial solutions
    { source: '/commercial', destination: '/services/commercial-solutions', permanent: true },
    { source: '/commercial-cctv', destination: '/services/commercial-solutions', permanent: true },
    { source: '/commercial-alarm-2', destination: '/services/commercial-solutions', permanent: true },
    { source: '/commercial-audio-visual', destination: '/services/commercial-solutions', permanent: true },

    // old home pages → home solutions
    { source: '/home-2', destination: '/services/home-solutions', permanent: true },
    { source: '/home-video', destination: '/services/home-solutions', permanent: true },
    { source: '/home-access-control', destination: '/services/home-solutions', permanent: true },
    { source: '/home-alarm', destination: '/services/home-solutions', permanent: true },

    // old news → latest news
    { source: '/news', destination: '/latest-news', permanent: true },

    // WordPress files
    { source: '/wp-admin', destination: '/', permanent: true },
    { source: '/wp-login.php', destination: '/', permanent: true },
    { source: '/wp-content/:path*', destination: '/', permanent: true },
    { source: '/feed', destination: '/', permanent: true },
    { source: '/xmlrpc.php', destination: '/', permanent: true },
  ];
},
  images: {
    dangerouslyAllowLocalIP: isLocalApi,
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/**' },
      ...(apiHost && apiHost !== '127.0.0.1' && apiHost !== 'localhost'
        ? [
            { protocol: 'https', hostname: apiHost, port: '', pathname: '/**' },
            { protocol: 'http', hostname: apiHost, port: '', pathname: '/**' },
          ]
        : []),
    ],
  },
};

export default nextConfig;

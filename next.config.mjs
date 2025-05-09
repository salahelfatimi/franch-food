/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tzdsiwt61f.ufs.sh',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;

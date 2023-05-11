/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        esmExternals: 'loose',
        serverActions: true
         },
}

module.exports = nextConfig

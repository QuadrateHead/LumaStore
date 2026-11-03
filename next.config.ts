import type { NextConfig } from 'next'

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGitHubPagesBuild
    ? {
        output: 'export' as const,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
}

export default nextConfig


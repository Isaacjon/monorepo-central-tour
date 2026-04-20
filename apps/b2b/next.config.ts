import {
  appendSvgrWebpackRule,
  centralTourSvgrTurbopack,
} from "@central-tour/config/next/svgr"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts")

const nextConfig: NextConfig = {
  transpilePackages: ["ui"],
  turbopack: centralTourSvgrTurbopack,
  webpack(config) {
    appendSvgrWebpackRule(config)
    return config
  },
}

export default withNextIntl(nextConfig)

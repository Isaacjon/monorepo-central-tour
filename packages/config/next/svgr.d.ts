import type { NextConfig } from "next"

export declare const centralTourSvgrTurbopack: NonNullable<
  NextConfig["turbopack"]
>

export declare function appendSvgrWebpackRule(config: {
  module?: { rules?: unknown[] }
}): void

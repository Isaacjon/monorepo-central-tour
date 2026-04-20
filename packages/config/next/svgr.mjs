/** @type {Record<string, unknown>} */
export const centralTourSvgrTurbopack = {
  rules: {
    "*.svg": {
      loaders: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
      as: "*.js",
    },
  },
}

/** @param {{ module?: { rules?: unknown[] } }} config */
export function appendSvgrWebpackRule(config) {
  if (!config.module) {
    config.module = { rules: [] }
  }
  if (!config.module.rules) {
    config.module.rules = []
  }
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
        },
      },
    ],
  })
}

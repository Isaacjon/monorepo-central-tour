declare module "*.svg" {
  import type * as React from "react"
  const Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Svg
}

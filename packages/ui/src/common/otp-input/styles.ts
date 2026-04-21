export type OtpVisualStatus = "default" | "error" | "success"

export const FILLED_CLASS: Record<OtpVisualStatus, string> = {
  default: "border-2 border-control-accent text-control-accent",
  error: "border-2 border-[#FEE4E2] text-[#F04438]",
  success: "border-2 border-[#DCFAE6] text-[#17B26A]",
}

export const FOCUS_CLASS: Record<OtpVisualStatus, string> = {
  default:
    "focus-visible:border-2 focus-visible:border-control-accent focus-visible:shadow-[0px_0px_0px_4px_color-mix(in_srgb,var(--color-control-accent)_24%,transparent),0px_1px_2px_0px_rgba(16,24,40,0.05)]",
  error:
    "focus-visible:border-2 focus-visible:border-[#FEE4E2] focus-visible:shadow-[0px_0px_0px_4px_color-mix(in_srgb,#F04438_24%,transparent),0px_1px_2px_0px_rgba(16,24,40,0.05)]",
  success:
    "focus-visible:border-2 focus-visible:border-[#DCFAE6] focus-visible:shadow-[0px_0px_0px_4px_color-mix(in_srgb,#17B26A_24%,transparent),0px_1px_2px_0px_rgba(16,24,40,0.05)]",
}

export const BASE_CELL_CLASS =
  "box-border h-[80px] w-[67.2px] rounded-[8px] bg-background px-2 py-[10px] text-center font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-[48px] font-medium leading-[60px] tracking-[-0.02em] shadow-[0px_1px_2px_0px_#1018280D] outline-none transition-colors placeholder:text-c-gray-300"

export const DISABLED_CELL_CLASS =
  "cursor-not-allowed border border-c-gray-300 bg-muted text-c-gray-300 shadow-none"

export const EMPTY_CELL_CLASS = "border border-c-gray-300 text-c-gray-300"

import { getTranslations } from "next-intl/server"
import type { ComponentType, SVGProps } from "react"

import BicyclingRoundIcon from "@/shared/assets/icons/bicycling-round.svg"
import HikingRoundIcon from "@/shared/assets/icons/hiking-round.svg"
import SwimmingRoundIcon from "@/shared/assets/icons/swimming-round.svg"
import { cn } from "ui"

const FEATURE_ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  HikingRoundIcon,
  BicyclingRoundIcon,
  SwimmingRoundIcon,
]

type WhyChooseUsSectionProps = {
  className?: string
  /** Unique id for the section heading (use when multiple instances exist on a page). */
  headingId?: string
}

const inter =
  "font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif)"

export async function WhyChooseUsSection({
  className,
  headingId = "why-choose-us-heading",
}: WhyChooseUsSectionProps) {
  const t = await getTranslations("whyChooseUs")

  const features = [
    { title: t("feature1Title"), description: t("feature1Description") },
    { title: t("feature2Title"), description: t("feature2Description") },
    { title: t("feature3Title"), description: t("feature3Description") },
  ]

  return (
    <section
      className={cn("ct-container mt-12", className)}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-['Druk_Text_Wide_Cyr',sans-serif] text-[48px] leading-[72px] font-medium tracking-[0] text-[#171717]"
      >
        {t("title")}
      </h2>
      <p
        className={cn(
          "mt-4 mb-8 text-[20px] leading-[100%] font-normal tracking-[0] text-[#171717]",
          inter
        )}
      >
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        {features.map((feature, index) => {
          const Icon = FEATURE_ICONS[index]
          if (!Icon) {
            return null
          }
          return (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className="flex size-[70px] shrink-0 items-center justify-center rounded-full bg-[#FFE4E8]"
                aria-hidden
              >
                <Icon width={32} height={32} className="text-primary" />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <h3
                  className={cn(
                    "text-2xl leading-8 font-medium tracking-[0] text-gray-950",
                    inter
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-base leading-5 font-normal tracking-[0] text-[#98A2B3]",
                    inter
                  )}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"

import {
  aboutUsSectionImage1,
  aboutUsSectionImage2,
  cn,
  PrimaryButton,
} from "ui"

export type FlightsAboutNumbersCopy = {
  title: string
  subtitle: string
  stat1Number: string
  stat1Label: string
  stat2Number: string
  stat2Label: string
  stat3Number: string
  stat3Label: string
  ctaLabel: string
  image1Alt: string
  image2Alt: string
}

type FlightsAboutNumbersSectionProps = {
  copy: FlightsAboutNumbersCopy
  ctaHref: string
  className?: string
}

export function FlightsAboutNumbersSection({
  copy,
  ctaHref,
  className,
}: FlightsAboutNumbersSectionProps) {
  return (
    <section
      className={cn("ct-container pt-[100px]", className)}
      aria-labelledby="flights-about-numbers-heading"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-12">
        <div className="flex flex-1 flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative h-[340px] w-full overflow-hidden rounded-2xl sm:w-[320px] sm:max-w-[320px] sm:shrink-0">
            <Image
              src={aboutUsSectionImage1}
              alt={copy.image1Alt}
              width={320}
              height={340}
              className="size-full object-cover"
            />
          </div>
          <div className="relative h-[340px] w-full overflow-hidden rounded-2xl sm:w-[284px] sm:max-w-[284px] sm:shrink-0">
            <Image
              src={aboutUsSectionImage2}
              alt={copy.image2Alt}
              width={284}
              height={340}
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="flights-about-numbers-heading"
            className="font-['Druk_Text_Wide_Cyr',sans-serif] text-[48px] leading-[72px] font-medium tracking-[0] text-[#171717]"
          >
            {copy.title}
          </h2>
          <p className="mt-4 mb-9 font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[20px] leading-[100%] font-normal tracking-[0] text-[#171717]">
            {copy.subtitle}
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="min-w-0">
              <p className="text-primary font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[56px] leading-[38px] font-medium tracking-[0]">
                {copy.stat1Number}
              </p>
              <p className="font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[20px] leading-[38px] font-normal tracking-[0] text-black">
                {copy.stat1Label}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-primary font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[56px] leading-[38px] font-medium tracking-[0]">
                {copy.stat2Number}
              </p>
              <p className="font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[20px] leading-[38px] font-normal tracking-[0] text-black">
                {copy.stat2Label}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-primary font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[56px] leading-[38px] font-medium tracking-[0]">
                {copy.stat3Number}
              </p>
              <p className="font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[20px] leading-[38px] font-normal tracking-[0] text-black">
                {copy.stat3Label}
              </p>
            </div>
          </div>

          <PrimaryButton
            asChild
            className="mt-10 h-12 w-[180px] gap-2.5 rounded-xl px-4 py-[10px]"
          >
            <Link href={ctaHref}>{copy.ctaLabel}</Link>
          </PrimaryButton>
        </div>
      </div>
    </section>
  )
}

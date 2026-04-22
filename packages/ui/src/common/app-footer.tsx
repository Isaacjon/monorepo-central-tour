import Image from "next/image"
import Link from "next/link"
import type { ComponentType, SVGProps } from "react"

import FbIcon from "../assets/icons/fb.svg"
import InstaIcon from "../assets/icons/insta.svg"
import TgIcon from "../assets/icons/tg.svg"
import { cn } from "../lib/utils"

export type AppFooterNavItem = {
  label: string
  href: string
}

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>

const SOCIAL: {
  id: "instagram" | "facebook" | "telegram"
  hrefKey: "instagram" | "facebook" | "telegram"
  label: string
  Icon: SvgIcon
}[] = [
  {
    id: "instagram",
    hrefKey: "instagram",
    label: "Instagram",
    Icon: InstaIcon,
  },
  { id: "facebook", hrefKey: "facebook", label: "Facebook", Icon: FbIcon },
  { id: "telegram", hrefKey: "telegram", label: "Telegram", Icon: TgIcon },
]

export type AppFooterProps = {
  logoSrc: string
  /** Where the logo links (e.g. `/${lang}`) */
  logoHref: string
  logoAlt?: string
  navItems: AppFooterNavItem[]
  /** Second row, left: visible label and href */
  privacyLabel: string
  privacyHref: string
  /** Shown in second row, right; links with mailto: */
  contactEmail: string
  socialLinks: {
    instagram: string
    facebook: string
    telegram: string
  }
  className?: string
  /** Bar background; default matches the Centbed marketing footer. */
  barClassName?: string
}

export function AppFooter({
  logoSrc,
  logoHref,
  logoAlt = "",
  navItems,
  privacyLabel,
  privacyHref,
  contactEmail,
  socialLinks,
  className,
  barClassName,
}: AppFooterProps) {
  return (
    <footer
      className={cn(
        "font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-white",
        className
      )}
    >
      <div className={cn("w-full bg-[#2563EB] py-14", barClassName)}>
        <div className="ct-container">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href={logoHref}
                  className="relative inline-block h-9 max-w-full shrink-0"
                >
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={180}
                    height={48}
                    className="h-9 w-auto object-contain object-left brightness-0 invert"
                  />
                </Link>
                {navItems.length > 0 ? (
                  <nav
                    className="flex flex-wrap items-center gap-4"
                    aria-label="Footer"
                  >
                    {navItems.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        className="inline-flex h-10 min-h-10 items-center justify-center rounded-lg p-2 text-base leading-6 font-normal text-white transition-opacity hover:opacity-90"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-4 lg:ml-auto">
                {SOCIAL.map(({ id, hrefKey, label, Icon }) => (
                  <a
                    key={id}
                    href={socialLinks[hrefKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center text-white transition-opacity hover:opacity-90"
                    aria-label={label}
                  >
                    <Icon className="size-10" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={privacyHref}
                className="text-lg leading-[100%] font-normal"
              >
                {privacyLabel}
              </Link>
              <a
                href={`mailto:${contactEmail}`}
                className="text-lg leading-[100%] font-normal sm:text-right"
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

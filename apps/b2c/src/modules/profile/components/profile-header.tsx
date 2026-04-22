import { AppHeader } from "@/shared/components/common/app-header"
import type { ProfileHeaderCopy } from "@/modules/profile/types/profile-header-copy"

type ProfileHeaderProps = {
  copy: ProfileHeaderCopy
  lang: string
}

export function ProfileHeader({ copy, lang }: ProfileHeaderProps) {
  return <AppHeader copy={copy} lang={lang} />
}

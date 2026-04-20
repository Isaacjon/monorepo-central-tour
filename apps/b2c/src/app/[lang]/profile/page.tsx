import { ProfilePage } from "@/modules/profile/pages/profile-page"

export default async function LocalizedProfileRoute({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <ProfilePage lang={lang} />
}

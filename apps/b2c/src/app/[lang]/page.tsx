import { HomePage } from "@/modules/home/pages/home-page"

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <HomePage lang={lang} />
}

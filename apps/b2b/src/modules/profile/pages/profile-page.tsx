import { getTranslations } from "next-intl/server"

export async function ProfilePage({ lang }: { lang: string }) {
  const t = await getTranslations("profile")

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-6 py-10">
      <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        {t("badge")} · {lang.toUpperCase()}
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground text-base">{t("description")}</p>
    </main>
  )
}

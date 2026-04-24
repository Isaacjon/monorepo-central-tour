type CheckoutPaymentStatus = "success" | "error"

function parseCheckoutPaymentStatus(
  value: string | string[] | undefined
): CheckoutPaymentStatus {
  if (value === "error") {
    return "error"
  }
  return "success"
}

export function getCheckoutResultHref({
  lang,
  paymentStatus,
}: {
  lang: string
  paymentStatus: string | string[] | undefined
}) {
  const status = parseCheckoutPaymentStatus(paymentStatus)
  return `/${lang}/flights/checkout/${status}`
}

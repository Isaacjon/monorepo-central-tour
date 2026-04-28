import type { FlightsCheckoutContentCopy } from "../../types/flights-checkout-content-copy"

type FlightsCheckoutPriceSummaryCardProps = {
  copy: FlightsCheckoutContentCopy
}

function PriceLineRow({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-base leading-6 font-normal text-[#1A1A1A]">
        {label}
      </span>
      <span
        className={
          valueClassName ??
          "text-[15.9px] leading-6 font-normal text-[#1A1A1A] tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  )
}

function BaggageDetailRow({
  label,
  value,
  valueVariant,
}: {
  label: string
  value: string
  valueVariant: "airline" | "success"
}) {
  const valueClass =
    valueVariant === "success"
      ? "text-base leading-none font-normal text-[#17B26A] whitespace-nowrap"
      : "text-base leading-none font-normal text-[#1D2939]"

  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-c-gray-400 text-base leading-none font-normal">
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  )
}

export function FlightsCheckoutPriceSummaryCard({
  copy,
}: FlightsCheckoutPriceSummaryCardProps) {
  return (
    <aside className="min-h-[416px] w-full shrink-0 rounded-[20px] border border-[#EAECF0] bg-white p-5 shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)] lg:w-[360px]">
      <div className="flex flex-col gap-2.5">
        <h2 className="text-c-gray-950 text-base leading-6 font-bold">
          {copy.priceSummaryTitle}
        </h2>

        <div className="flex flex-col gap-2.5">
          <PriceLineRow
            label={copy.priceSummaryTicketsLabel}
            value={copy.priceSummaryTicketsValue}
          />
          <PriceLineRow
            label={copy.baggageOutboundLabel}
            value={copy.priceSummaryOutboundValue}
          />
          <PriceLineRow
            label={copy.baggageInboundLabel}
            value={copy.priceSummaryInboundValue}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-base leading-6 font-normal text-[#1A1A1A]">
            {copy.priceSummaryBaggageHeading}
          </p>
          <div className="flex flex-col gap-4">
            <BaggageDetailRow
              label={copy.baggagePersonalItemLabel}
              value={copy.priceSummaryAirlineNote}
              valueVariant="airline"
            />
            <BaggageDetailRow
              label={copy.baggageCarryOnLabel}
              value={copy.priceSummaryFree}
              valueVariant="success"
            />
            <BaggageDetailRow
              label={copy.baggageCheckedLabel}
              value={copy.priceSummaryFree}
              valueVariant="success"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-base leading-6 font-normal text-[#1A1A1A]">
            {copy.additionalServicesTitle}
          </p>
          <div className="flex flex-col gap-4">
            <BaggageDetailRow
              label={copy.priceSummaryGuaranteeLabel}
              value={copy.priceSummaryGuaranteeValue}
              valueVariant="success"
            />
          </div>
        </div>

        <div className="mt-2.5 border-t border-[#EAECF0] pt-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-base leading-6 font-bold text-[#1A1A1A]">
              {copy.priceSummaryTotalLabel}
            </span>
            <span className="text-base leading-6 font-bold text-[#1A1A1A] tabular-nums">
              {copy.priceSummaryTotalValue}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

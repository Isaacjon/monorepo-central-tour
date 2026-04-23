import type { FlightRoomGuests } from "../components/flights-passengers-popover/flight-room-guests"
import {
  cloneRooms,
  defaultFirstRoom,
} from "../components/flights-passengers-popover/flight-room-guests"

const ROOM_SEP = "/"

/**
 * Readable URL encoding: rooms separated by `/`, each room `adults-children` or
 * `adults-children-age1,age2` (use `_` for an age not yet selected).
 */
export function encodeGuestRooms(rooms: FlightRoomGuests[]): string {
  return rooms.map(encodeRoom).join(ROOM_SEP)
}

function encodeRoom(r: FlightRoomGuests): string {
  if (r.children === 0) {
    return `${r.adults}-0`
  }
  const ages = r.childAges.map((a) => (a === undefined ? "_" : String(a))).join(",")
  return `${r.adults}-${r.children}-${ages}`
}

export function decodeGuestRooms(raw: string): FlightRoomGuests[] {
  const trimmed = raw.trim()
  if (!trimmed) {
    return cloneRooms([defaultFirstRoom()])
  }
  return trimmed.split(ROOM_SEP).map(decodeRoom)
}

function decodeRoom(part: string): FlightRoomGuests {
  const segments = part.split("-")
  const adults = Math.max(0, Number.parseInt(segments[0] ?? "0", 10) || 0)
  const children = Math.max(0, Number.parseInt(segments[1] ?? "0", 10) || 0)
  if (children === 0) {
    return { adults, children: 0, childAges: [] }
  }
  const agePart = segments.slice(2).join("-")
  const ageTokens = agePart ? agePart.split(",") : []
  const childAges: (number | undefined)[] = []
  for (let i = 0; i < children; i++) {
    const t = ageTokens[i]?.trim()
    if (t === undefined || t === "" || t === "_") {
      childAges.push(undefined)
    } else {
      const n = Number.parseInt(t, 10)
      childAges.push(Number.isFinite(n) ? n : undefined)
    }
  }
  return { adults, children, childAges }
}

export type FlightRoomGuests = {
  adults: number
  children: number
  /** Length always equals `children`; `undefined` means age not selected yet */
  childAges: (number | undefined)[]
}

export const MAX_PER_ROOM = 9
export const MAX_ROOMS = 4
const CHILD_AGE_MIN = 0
const CHILD_AGE_MAX = 17

export function defaultFirstRoom(): FlightRoomGuests {
  return { adults: 1, children: 0, childAges: [] }
}

export function defaultAdditionalRoom(): FlightRoomGuests {
  return { adults: 1, children: 0, childAges: [] }
}

export function cloneRooms(rooms: FlightRoomGuests[]): FlightRoomGuests[] {
  return rooms.map((r) => ({
    ...r,
    childAges: [...r.childAges],
  }))
}

export function totalGuests(rooms: FlightRoomGuests[]) {
  return rooms.reduce((acc, r) => acc + r.adults + r.children, 0)
}

export const AGE_OPTIONS = Array.from(
  { length: CHILD_AGE_MAX - CHILD_AGE_MIN + 1 },
  (_, i) => CHILD_AGE_MIN + i
)

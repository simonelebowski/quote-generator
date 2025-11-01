import { Course, PartySize, TransferAirport, TransferOption } from "@/types/quote";

export function getWeeklyPriceForWeeks(course: Course, weeks: number): number {
  const tier = course.tiers.find(t => weeks >= t.minWeeks && (t.maxWeeks ? weeks <= t.maxWeeks : true));
  return tier ? tier.weeklyPrice : course.tiers[course.tiers.length - 1].weeklyPrice;
}

export function calcTransferTotal(
  airport: TransferAirport | undefined,
  option: TransferOption,
  partySize: PartySize
): number {
  if (!airport || option === "none") return 0;
  if (option === "one_way") return airport.prices.oneWay[partySize] ?? 0;
  if (option === "return")  return airport.prices.return[partySize] ?? 0;
  return 0;
}
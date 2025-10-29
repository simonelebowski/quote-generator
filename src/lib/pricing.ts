import { Course } from "@/types/quote";

export function getWeeklyPriceForWeeks(course: Course, weeks: number): number {
  const tier = course.tiers.find(t => weeks >= t.minWeeks && (t.maxWeeks ? weeks <= t.maxWeeks : true));
  return tier ? tier.weeklyPrice : course.tiers[course.tiers.length - 1].weeklyPrice;
}
 
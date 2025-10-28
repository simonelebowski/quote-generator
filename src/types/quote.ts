export type ExtraType = "flat" | "per_week" | "per_transfer";
export type TransferOption = "none" | "one_way" | "return";

export interface CoursePricingTier {
  minWeeks: number;
  maxWeeks?: number;
  weeklyPrice: number;
}

export interface Course { id: string; name: string; tiers: CoursePricingTier[]; }

export interface Accommodation { id: string; name: string; weeklyPrice: number; placementFee?: number; }

export interface ExtraBase { id: string; name: string; type: ExtraType; amount: number; defaultSelected?: boolean; }

export interface School {
  id: string; name: string; location: string; currency: string;
  courses: Course[]; accommodations: Accommodation[]; extras: ExtraBase[];
  transfers?: { airportName: string; oneWay: number; return: number; };
}

export interface QuoteLineItem { label: string; amount: number; }

export interface QuoteStateSnapshot {
  schoolId: string; courseId: string; weeks: number;
  accommodationId: string | "none"; accomWeeks: number;
  transfer: TransferOption; selectedExtras: Record<string, boolean>;
}

export interface Quote {
  id: string; createdAt: string; schoolName: string; courseName: string; currency: string;
  totals: { tuition: number; accommodation: number; registrationFee: number; textbookFee: number; insurance: number; accomPlacement: number; transfers: number; grandTotal: number; };
  items: QuoteLineItem[]; params: QuoteStateSnapshot; shareUrl?: string;
}

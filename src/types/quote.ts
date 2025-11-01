export type ExtraType = "flat" | "per_week" | "per_transfer";

export interface CoursePricingTier {
  minWeeks: number;
  maxWeeks?: number;
  weeklyPrice: number;
}

export interface Course { id: string; name: string; tiers: CoursePricingTier[]; }

export interface Accommodation { id: string; name: string; weeklyPrice: number; placementFee?: number; }

export interface ExtraBase { id: string; name: string; type: ExtraType; amount: number; defaultSelected?: boolean; }

export interface School {
  id: string;
  name: string;
  address: string;
  postcode: string; 
  telephone: string,
  email: string,
  currency: string;
  courses: Course[];
  accommodations: Accommodation[];
  extras?: ExtraBase[]; // textbook, insurance, registration, etc.
  transfers?: TransferAirport[];
}

// QUOTE TYPES------------------------------------------------------------------------------------------------------------------
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

// TRANSFERS TYPES-------------------------------------------------------------------------------------------------------------
export type PartySize = 1 | 2 | 3;
export type TransferOption = "none" | "one_way" | "return";

export interface TransferPrice {
  oneWay: Record<PartySize, number>;  // e.g. {1: 85, 2: 120, 3: 150}
  return: Record<PartySize, number>;  // e.g. {1: 150, 2: 210, 3: 260}
}

export interface TransferAirport {
  code: string;           // "LHR"
  name: string;           // "Heathrow"
  prices: TransferPrice;  // pricing per party size
}
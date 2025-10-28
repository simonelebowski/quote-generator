"use client"
import { useEffect, useMemo, useState } from "react";
import { getWeeklyPriceForWeeks } from "@/lib/pricing";
import { formatCurrency, makeQuoteId } from "@/lib/currency";
import { loadSavedQuotes, saveQuotes } from "@/lib/quotes";
import MainSection from "./MainSection";
import QuoteSummary from "./QuoteSummary";

// Next.js + TS + React single-file demo component with Save/Load
// Drop this file into /app/quote/page.tsx (App Router) or /pages/quote.tsx (Pages Router)
// Tailwind CSS recommended for styling.

// -------------------- Types --------------------
type ExtraType = "flat" | "per_week" | "per_transfer";

type TransferOption = "none" | "one_way" | "return";

interface ExtraBase {
  id: string;
  name: string;
  type: ExtraType;
  amount: number; // currency amount; for per_week it's per week; for per_transfer it's per single trip
  defaultSelected?: boolean;
}

interface CoursePricingTier {
  minWeeks: number; // inclusive
  maxWeeks?: number; // inclusive; if undefined, open-ended
  weeklyPrice: number;
}

interface Course {
  id: string;
  name: string;
  tiers: CoursePricingTier[];
}

interface Accommodation {
  id: string;
  name: string;
  weeklyPrice: number;
  placementFee?: number; // can be handled as an extra too
}

interface School {
  id: string;
  name: string;
  location: string;
  currency: string; // currency symbol for display (e.g., "£", "€", "$" )
  courses: Course[];
  accommodations: Accommodation[];
  extras: ExtraBase[]; // textbook, insurance, registration, etc.
  transfers?: {
    airportName: string;
    oneWay: number;
    return: number;
  };
}

interface QuoteLineItem {
  label: string;
  amount: number;
}

interface QuoteStateSnapshot {
  schoolId: string;
  courseId: string;
  weeks: number;
  accommodationId: string | "none";
  accomWeeks: number;
  transfer: TransferOption;
  selectedExtras: Record<string, boolean>;
}

interface Quote {
  id: string; // human readable (e.g. Q-2025-10-27-123456)
  createdAt: string; // ISO
  schoolName: string;
  courseName: string;
  currency: string;
  totals: {
    tuition: number;
    accommodation: number;
    registrationFee: number;
    textbookFee: number;
    insurance: number;
    accomPlacement: number;
    transfers: number;
    grandTotal: number;
  };
  items: QuoteLineItem[];
  params: QuoteStateSnapshot; // to restore UI
  shareUrl?: string; // state-encoded link
}

// -------------------- Sample Data --------------------
const SCHOOLS: School[] = [
  {
    id: "london-language-centre",
    name: "London Language Centre",
    location: "London, UK",
    currency: "£",
    courses: [
      {
        id: "general-english",
        name: "General English",
        tiers: [
          { minWeeks: 1, maxWeeks: 11, weeklyPrice: 230 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 210 },
          { minWeeks: 24, weeklyPrice: 195 },
        ],
      },
      {
        id: "ielts-prep",
        name: "IELTS Preparation",
        tiers: [
          { minWeeks: 1, maxWeeks: 11, weeklyPrice: 260 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 235 },
          { minWeeks: 24, weeklyPrice: 220 },
        ],
      },
    ],
    accommodations: [
      { id: "host-family", name: "Host Family (Half-board)", weeklyPrice: 220, placementFee: 65 },
      { id: "student-residence", name: "Student Residence (Self-catered)", weeklyPrice: 280, placementFee: 85 },
    ],
    extras: [
      { id: "registration", name: "Registration Fee", type: "flat", amount: 60, defaultSelected: true },
      { id: "textbook", name: "Textbook", type: "flat", amount: 35 },
      { id: "insurance", name: "Insurance (per week)", type: "per_week", amount: 8 },
      { id: "accom-placement", name: "Accommodation Placement Fee", type: "flat", amount: 65 },
    ],
    transfers: {
      airportName: "Heathrow (LHR)",
      oneWay: 85,
      return: 150,
    },
  },
  {
    id: "dublin-english-academy",
    name: "Dublin English Academy",
    location: "Dublin, Ireland",
    currency: "€",
    courses: [
      {
        id: "general-english",
        name: "General English",
        tiers: [
          { minWeeks: 1, maxWeeks: 11, weeklyPrice: 210 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 195 },
          { minWeeks: 24, weeklyPrice: 180 },
        ],
      },
      {
        id: "business-english",
        name: "Business English",
        tiers: [
          { minWeeks: 1, maxWeeks: 11, weeklyPrice: 270 },
          { minWeeks: 12, weeklyPrice: 245 },
        ],
      },
    ],
    accommodations: [
      { id: "host-family", name: "Host Family (Half-board)", weeklyPrice: 240, placementFee: 50 },
      { id: "residence", name: "City Residence (En-suite)", weeklyPrice: 320, placementFee: 90 },
    ],
    extras: [
      { id: "registration", name: "Registration Fee", type: "flat", amount: 50, defaultSelected: true },
      { id: "textbook", name: "Textbook", type: "flat", amount: 40 },
      { id: "insurance", name: "Insurance (per week)", type: "per_week", amount: 7 },
      { id: "accom-placement", name: "Accommodation Placement Fee", type: "flat", amount: 50 },
    ],
    transfers: {
      airportName: "Dublin (DUB)",
      oneWay: 60,
      return: 110,
    },
  },
  {
    id: "new-york-language-school",
    name: "New York Language School",
    location: "New York, USA",
    currency: "$",
    courses: [
      {
        id: "intensive-english",
        name: "Intensive English",
        tiers: [
          { minWeeks: 1, maxWeeks: 11, weeklyPrice: 360 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 330 },
          { minWeeks: 24, weeklyPrice: 310 },
        ],
      },
    ],
    accommodations: [
      { id: "homestay", name: "Homestay (Breakfast)", weeklyPrice: 300, placementFee: 90 },
      { id: "residence", name: "Residence (Shared)", weeklyPrice: 420, placementFee: 120 },
    ],
    extras: [
      { id: "registration", name: "Registration Fee", type: "flat", amount: 120, defaultSelected: true },
      { id: "textbook", name: "Textbook", type: "flat", amount: 55 },
      { id: "insurance", name: "Insurance (per week)", type: "per_week", amount: 12 },
      { id: "accom-placement", name: "Accommodation Placement Fee", type: "flat", amount: 90 },
    ],
    transfers: {
      airportName: "JFK",
      oneWay: 95,
      return: 170,
    },
  },
];

// -------------------- Component --------------------
export default function QuoteCalculator(): JSX.Element {
  // UI State
  const [schoolId, setSchoolId] = useState<string>(SCHOOLS[0].id);
  const [courseId, setCourseId] = useState<string>(SCHOOLS[0].courses[0].id);
  const [weeks, setWeeks] = useState<number>(4);
  const [accommodationId, setAccommodationId] = useState<string | "none">("none");
  const [accomWeeks, setAccomWeeks] = useState<number>(4);
  const [transfer, setTransfer] = useState<TransferOption>("none");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});

  const [saved, setSaved] = useState<Quote[]>([]);

  // Load defaults from selected school (for URL hydration etc.)
  const school = useMemo(() => SCHOOLS.find((s) => s.id === schoolId)!, [schoolId]);
  const course = useMemo(() => school.courses.find((c) => c.id === courseId)!, [school, courseId]);
  const accommodation = useMemo(() => school.accommodations.find((a) => a.id === accommodationId), [school, accommodationId]);

  // Initialize defaults when component mounts and when school changes
  useEffect(() => {
    setSaved(loadSavedQuotes());
  }, []);

  useEffect(() => {
    setCourseId(school.courses[0]?.id ?? "");
    setAccommodationId("none");
    setAccomWeeks(weeks);
    const init: Record<string, boolean> = {};
    school.extras.forEach((e) => {
      if (e.defaultSelected) init[e.id] = true;
    });
    setSelectedExtras(init);
    setTransfer("none");
  }, [
    


  ]);

  // Keep accom weeks aligned by default with course weeks
  useEffect(() => {
    if (accommodationId === "none") return; // don't force when none
    setAccomWeeks((prev) => (prev === weeks ? weeks : prev));
  }, [weeks]);

  // URL share (serialize)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("school", schoolId);
    params.set("course", courseId);
    params.set("weeks", String(weeks));
    params.set("accommodation", accommodationId);
    params.set("accomWeeks", String(accomWeeks));
    params.set("transfer", transfer);
    Object.entries(selectedExtras).forEach(([k, v]) => v && params.append("extra", k));
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "Quote", url);
  }, [schoolId, courseId, weeks, accommodationId, accomWeeks, transfer, selectedExtras]);

  // URL hydrate
  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams(window.location.search);
    const s = qs.get("school");
    const c = qs.get("course");
    const w = qs.get("weeks");
    const a = qs.get("accommodation");
    const aw = qs.get("accomWeeks");
    const t = qs.get("transfer");
    const ex = qs.getAll("extra");

    if (s && SCHOOLS.some((x) => x.id === s)) setSchoolId(s);
    if (c) setCourseId(c);
    if (w) setWeeks(Number(w));
    if (a) setAccommodationId(a as any);
    if (aw) setAccomWeeks(Number(aw));
    if (t) setTransfer(t as TransferOption);
    if (ex.length) setSelectedExtras(Object.fromEntries(ex.map((e) => [e, true])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------- Calculations --------------
  const weeklyCoursePrice = getWeeklyPriceForWeeks(course, weeks);
  const tuition = weeklyCoursePrice * weeks;

  const accomWeekly = accommodation?.weeklyPrice ?? 0;
  const accomTotal = accommodation ? accomWeekly * accomWeeks : 0;

  const registrationFee = selectedExtras["registration"]
    ? school.extras.find((e) => e.id === "registration")?.amount ?? 0
    : 0;

  const textbookFee = selectedExtras["textbook"]
    ? school.extras.find((e) => e.id === "textbook")?.amount ?? 0
    : 0;

  const insurancePerWeek = selectedExtras["insurance"]
    ? school.extras.find((e) => e.id === "insurance")?.amount ?? 0
    : 0;
  const insuranceTotal = insurancePerWeek * weeks;

  const accomPlacement = selectedExtras["accom-placement"]
    ? school.extras.find((e) => e.id === "accom-placement")?.amount ?? 0
    : 0;

  const transferTotal = (() => {
    if (!school.transfers) return 0;
    if (transfer === "one_way") return school.transfers.oneWay;
    if (transfer === "return") return school.transfers.return;
    return 0;
  })();

  const subtotal = tuition + accomTotal + registrationFee + textbookFee + insuranceTotal + accomPlacement + transferTotal;

  // Build a quote object for saving/export
  function buildQuote(): Quote {
    const items: QuoteLineItem[] = [];
    items.push({ label: `Tuition (${weeks} × ${formatCurrency(school.currency, weeklyCoursePrice)})`, amount: tuition });
    if (accommodation) items.push({ label: `Accommodation – ${accommodation.name} (${accomWeeks} × ${formatCurrency(school.currency, accomWeekly)})`, amount: accomTotal });
    if (registrationFee) items.push({ label: `Registration Fee`, amount: registrationFee });
    if (textbookFee) items.push({ label: `Textbook`, amount: textbookFee });
    if (insuranceTotal) items.push({ label: `Insurance (${weeks} × ${formatCurrency(school.currency, insurancePerWeek)})`, amount: insuranceTotal });
    if (accomPlacement) items.push({ label: `Accommodation Placement Fee`, amount: accomPlacement });
    if (transferTotal) items.push({ label: `Airport Transfer (${transfer === "one_way" ? "One-way" : "Return"})`, amount: transferTotal });

    const params: QuoteStateSnapshot = {
      schoolId,
      courseId,
      weeks,
      accommodationId,
      accomWeeks,
      transfer,
      selectedExtras,
    };

    const shareUrl = typeof window !== "undefined" ? window.location.href : undefined;

    return {
      id: makeQuoteId(),
      createdAt: new Date().toISOString(),
      schoolName: school.name,
      courseName: course.name,
      currency: school.currency,
      totals: {
        tuition,
        accommodation: accomTotal,
        registrationFee,
        textbookFee,
        insurance: insuranceTotal,
        accomPlacement,
        transfers: transferTotal,
        grandTotal: subtotal,
      },
      items,
      params,
      shareUrl,
    };
  }

  function handleSaveQuote() {
    const q = buildQuote();
    const next = [q, ...saved];
    setSaved(next);
    saveQuotes(next);
    alert(`Saved quote ${q.id}`);
  }

  function restoreQuote(q: Quote) {
    setSchoolId(q.params.schoolId);
    setCourseId(q.params.courseId);
    setWeeks(q.params.weeks);
    setAccommodationId(q.params.accommodationId);
    setAccomWeeks(q.params.accomWeeks);
    setTransfer(q.params.transfer);
    setSelectedExtras(q.params.selectedExtras);
  }

  function deleteQuote(id: string) {
    const next = saved.filter((q) => q.id !== id);
    setSaved(next);
    saveQuotes(next);
  }

  function exportQuote(q?: Quote) {
    const toExport = q ?? buildQuote();
    const blob = new Blob([JSON.stringify(toExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toExport.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // -------------- UI helpers --------------
  const currency = school.currency;
  const label = (s: string) => <span className="text-sm font-medium text-gray-700">{s}</span>;

  // -------------- Render --------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">School Quote Calculator</h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Form */}
          <MainSection 
            schools={SCHOOLS}
            school={school}
            course={course}
            schoolId={schoolId}
            setSchoolId={setSchoolId}
            courseId={courseId}
            setCourseId={setCourseId}
            weeks={weeks}
            setWeeks={setWeeks}
            accommodationId={accommodationId}
            setAccommodationId={setAccommodationId}
            accomWeeks={accomWeeks}
            setAccomWeeks={setAccomWeeks}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
            transfer={transfer}
            setTransfer={setTransfer}
            weeklyCoursePrice={weeklyCoursePrice}
            currency={school.currency}
          />

          {/* Right: Summary */}
          <QuoteSummary 
            school={school}
            course={course}
            weeks={weeks}
            currency={currency}
            tuition={tuition}
            weeklyCoursePrice={weeklyCoursePrice}
            accommodation={accommodation}
            accomWeeks={accomWeeks}
            accomWeekly={accomWeekly}
            accomTotal={accomTotal}
            registrationFee={registrationFee}
            textbookFee={textbookFee}
            insuranceTotal={insuranceTotal}
            accomPlacement={accomPlacement}
            transferTotal={transferTotal}
            insurancePerWeek={insurancePerWeek}
            transfer={transfer}
            subtotal={subtotal}
            handleSaveQuote={handleSaveQuote}
            exportQuote={exportQuote}
          />
        </div>

        {/* Saved quotes panel */}
        <section className="mt-8 rounded-2xl bg-white p-5 shadow">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Saved Quotes (Local)</h3>
            <div className="flex gap-2">
              <button
                className="rounded-xl border border-gray-300 px-3 py-1 text-sm"
                onClick={() => {
                  if (confirm("Clear all saved quotes?")) {
                    setSaved([]);
                    saveQuotes([]);
                  }
                }}
              >
                Clear All
              </button>
            </div>
          </div>

          {saved.length === 0 ? (
            <p className="text-sm text-gray-600">No saved quotes yet. Click <span className="font-medium">Save Quote</span> to store one to this browser.</p>
          ) : (
            <ul className="divide-y">
              {saved.map((q) => (
                <li key={q.id} className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-medium">{q.id}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(q.createdAt).toLocaleString()} • {q.schoolName} • {q.courseName} • Total {formatCurrency(q.currency, q.totals.grandTotal)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-xl border border-gray-300 px-3 py-1 text-sm" onClick={() => restoreQuote(q)}>Load</button>
                    <button className="rounded-xl border border-gray-300 px-3 py-1 text-sm" onClick={() => exportQuote(q)}>Export</button>
                    {q.shareUrl && (
                      <button
                        className="rounded-xl border border-gray-300 px-3 py-1 text-sm"
                        onClick={async () => {
                          try { await navigator.clipboard.writeText(q.shareUrl!); alert("Link copied"); } catch {}
                        }}
                      >Copy Link</button>
                    )}
                    <button className="rounded-xl border border-red-300 px-3 py-1 text-sm text-red-700" onClick={() => deleteQuote(q.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Quote Calculator Demo
        </footer>
      </div>
    </div>
  );
}

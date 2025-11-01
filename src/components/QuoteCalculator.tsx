"use client"
import { useEffect, useMemo, useState } from "react";
import { SCHOOLS } from "@/data/data";
import { GLOBAL_EXTRAS } from "@/data/globals";
import { getWeeklyPriceForWeeks } from "@/lib/pricing";
import { calcTransferTotal } from "@/lib/pricing";
import { formatCurrency, makeQuoteId } from "@/lib/currency";
import { loadSavedQuotes, saveQuotes } from "@/lib/quotes";
import MainSection from "./MainSection";
import QuoteSummary from "./QuoteSummary";
import {
  TransferOption,
  PartySize,
  Quote,
  QuoteLineItem,
  QuoteStateSnapshot,
} from "@/types/quote";


// -------------------- Component --------------------
export default function QuoteCalculator(): JSX.Element {
  // UI State
  const [schoolId, setSchoolId] = useState<string>(SCHOOLS[0].id);
  const [courseId, setCourseId] = useState<string>(SCHOOLS[0].courses[0].id);
  const [weeks, setWeeks] = useState<number>(4);
  const [accommodationId, setAccommodationId] = useState<string | "none">("none");
  const [accomWeeks, setAccomWeeks] = useState<number>(4);
  const [transfer, setTransfer] = useState<TransferOption>("none");
  const [airportCode, setAirportCode] = useState<string>(""); 
  const [partySize, setPartySize] = useState<PartySize>(1);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});

  const [saved, setSaved] = useState<Quote[]>([]);

  // Load defaults from selected school (for URL hydration etc.)
  const school = useMemo(() => SCHOOLS.find((s) => s.id === schoolId)!, [schoolId]);
  const course = useMemo(() => school.courses.find((c) => c.id === courseId)!, [school, courseId]);
  const accommodation = useMemo(() => school.accommodations.find((a) => a.id === accommodationId), [school, accommodationId]);
  const airport = useMemo(() => school.transfers?.find(a => a.code === airportCode), [school, airportCode]);

  // Initialise defaults when component mounts and when school changes
  useEffect(() => {
    setSaved(loadSavedQuotes());
  }, []);

  useEffect(() => {
    setCourseId(school.courses[0]?.id ?? "");
    setAccommodationId("none");
    setAccomWeeks(weeks);
    setAirportCode("");
    setTransfer("none");
    setPartySize(1);
    const init: Record<string, boolean> = { registration: true };
    setSelectedExtras(init);
  }, []);

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
    params.set("airport", airportCode);
    params.set("party", String(partySize));
    Object.entries(selectedExtras).forEach(([k, v]) => v && params.append("extra", k));
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "Quote", url);
  }, [schoolId, courseId, weeks, accommodationId, accomWeeks, transfer, selectedExtras, airportCode, partySize]);

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
    const ap = qs.get("airport");
    const ps = qs.get("party");

    if (s && SCHOOLS.some((x) => x.id === s)) setSchoolId(s);
    if (c) setCourseId(c);
    if (w) setWeeks(Number(w));
    if (a) setAccommodationId(a as any);
    if (aw) setAccomWeeks(Number(aw));
    if (t) setTransfer(t as TransferOption);
    if (ex.length) setSelectedExtras(Object.fromEntries(ex.map((e) => [e, true])));
    if (ap) setAirportCode(ap);
    if (ps) setPartySize(Number(ps) as PartySize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------- Calculations --------------
  const weeklyCoursePrice = getWeeklyPriceForWeeks(course, weeks);
  const tuition = weeklyCoursePrice * weeks;

  const accomWeekly = accommodation?.weeklyPrice ?? 0;
  const accomTotal = accommodation ? accomWeekly * accomWeeks : 0;

  const registrationFee = selectedExtras["registration"] ? GLOBAL_EXTRAS.registration : 0;
  const textbookFee = selectedExtras["textbook"]     ? GLOBAL_EXTRAS.textbook     : 0;
  const insurancePerWeek = selectedExtras["insurance"] ? GLOBAL_EXTRAS.insurancePerWeek : 0;
  const insuranceTotal = insurancePerWeek * weeks;
  const accomPlacement = selectedExtras["accom-placement"] ? GLOBAL_EXTRAS.accomPlacement : 0;
  const transferTotal = calcTransferTotal(airport, transfer, partySize);

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
      airportCode,     // NEW
      partySize,       // NEW
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
    setAirportCode(q.params.airportCode ?? "");
    setPartySize((q.params.partySize as PartySize) ?? 1);
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
            airportCode={airportCode}
            setAirportCode={setAirportCode}
            partySize={partySize}
            setPartySize={setPartySize}
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
            airport={airport}
            partySize={partySize}
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

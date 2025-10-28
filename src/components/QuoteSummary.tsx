import { formatCurrency } from "@/lib/currency"

export default function QuoteSummary({
    school,
    course,
    weeks,
    currency,
    tuition,
    weeklyCoursePrice,
    accommodation,
    accomWeeks,
    accomWeekly,
    accomTotal,
    registrationFee,
    textbookFee,
    insuranceTotal,
    accomPlacement,
    transferTotal,
    insurancePerWeek,
    transfer,
    subtotal,
    handleSaveQuote,
    exportQuote,
}) {
    return (
              <aside className="rounded-2xl bg-white p-5 shadow">
                <h2 className="mb-3 text-lg font-semibold">Quote Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>School</span>
                    <span className="font-medium">{school.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Course</span>
                    <span className="font-medium">{course.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Course Weeks</span>
                    <span className="font-medium">{weeks}</span>
                  </div>
                  <hr />
                  <div>
                    <div className="mb-1 font-medium">Cost Breakdown</div>
                    <ul className="space-y-1">
                      <li className="flex justify-between"><span>Tuition ({weeks} × {formatCurrency(currency, weeklyCoursePrice)})</span><span>{formatCurrency(currency, tuition)}</span></li>
                      {accommodation && (
                        <li className="flex justify-between"><span>Accommodation – {accommodation.name} ({accomWeeks} × {formatCurrency(currency, accomWeekly)})</span><span>{formatCurrency(currency, accomTotal)}</span></li>
                      )}
                      {!!registrationFee && (
                        <li className="flex justify-between"><span>Registration Fee</span><span>{formatCurrency(currency, registrationFee)}</span></li>
                      )}
                      {!!textbookFee && (
                        <li className="flex justify-between"><span>Textbook</span><span>{formatCurrency(currency, textbookFee)}</span></li>
                      )}
                      {!!insuranceTotal && (
                        <li className="flex justify-between"><span>Insurance ({weeks} × {formatCurrency(currency, insurancePerWeek)})</span><span>{formatCurrency(currency, insuranceTotal)}</span></li>
                      )}
                      {!!accomPlacement && (
                        <li className="flex justify-between"><span>Accommodation Placement Fee</span><span>{formatCurrency(currency, accomPlacement)}</span></li>
                      )}
                      {!!transferTotal && (
                        <li className="flex justify-between"><span>Airport Transfer ({transfer === "one_way" ? "One-way" : "Return"})</span><span>{formatCurrency(currency, transferTotal)}</span></li>
                      )}
                    </ul>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(currency, subtotal)}</span>
                  </div>
    
                  <div className="mt-4 grid gap-2">
                    <button
                      type="button"
                      className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
                      onClick={handleSaveQuote}
                    >
                      Save Quote
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm"
                      onClick={() => exportQuote()}
                    >
                      Export current as JSON
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm"
                      onClick={() => window.print()}
                    >
                      Print / Save PDF
                    </button>
                    <div className="rounded-xl bg-gray-50 p-3 text-xs">
                      <div className="mb-1 font-semibold">Shareable link</div>
                      <p className="break-all text-gray-600">{typeof window !== "undefined" ? window.location.href : ""}</p>
                    </div>
                  </div>
                </div>
              </aside>
    )
}
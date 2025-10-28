import { formatCurrency } from "@/lib/currency";

// -------------- UI helpers --------------
const label = (s: string) => <span className="text-sm font-medium text-gray-700">{s}</span>;

export default function MainSection({
    schools,
    school,
    course,
    schoolId, setSchoolId,
    courseId, setCourseId,
    weeks, setWeeks,
    accommodationId, setAccommodationId,
    accomWeeks, setAccomWeeks,
    selectedExtras, setSelectedExtras,
    transfer, setTransfer,
    weeklyCoursePrice,
    currency
}) {
    return (
          <section className="lg:col-span-2 rounded-2xl bg-white p-5 shadow">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="col-span-2">
                        {label("School")}
                        <select
                          className="mt-1 w-full rounded-xl border border-gray-300 p-2"
                          value={schoolId}
                          onChange={(e) => setSchoolId(e.target.value)}
                        >
                          {schools.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} • {s.location}
                            </option>
                          ))}
                        </select>
                      </div>
        
                      <div>
                        {label("Course")}
                        <select
                          className="mt-1 w-full rounded-xl border border-gray-300 p-2"
                          value={courseId}
                          onChange={(e) => setCourseId(e.target.value)}
                        >
                          {school.courses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
        
                      <div>
                        {label("Course Weeks")}
                        <input
                          type="number"
                          min={1}
                          max={52}
                          className="mt-1 w-full rounded-xl border border-gray-300 p-2"
                          value={weeks}
                          onChange={(e) => setWeeks(Math.max(1, Number(e.target.value)))}
                        />
                        <p className="mt-1 text-xs text-gray-500">Weekly price: {formatCurrency(currency, weeklyCoursePrice)}</p>
                      </div>
        
                      <div>
                        {label("Accommodation")}
                        <select
                          className="mt-1 w-full rounded-xl border border-gray-300 p-2"
                          value={accommodationId}
                          onChange={(e) => setAccommodationId(e.target.value)}
                        >
                          <option value="none">No accommodation</option>
                          {school.accommodations.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name} ({formatCurrency(currency, a.weeklyPrice)}/week)
                            </option>
                          ))}
                        </select>
                      </div>
        
                      <div>
                        {label("Accommodation Weeks")}
                        <input
                          type="number"
                          min={0}
                          max={52}
                          className="mt-1 w-full rounded-xl border border-gray-300 p-2 disabled:bg-gray-100"
                          value={accomWeeks}
                          disabled={accommodationId === "none"}
                          onChange={(e) => setAccomWeeks(Math.max(0, Number(e.target.value)))}
                        />
                      </div>
        
                      <div className="col-span-2 rounded-xl border border-gray-200 p-3">
                        <div className="mb-2 text-sm font-semibold">Extras</div>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="size-4"
                              checked={!!selectedExtras["registration"]}
                              onChange={(e) =>
                                setSelectedExtras((prev) => ({ ...prev, registration: e.target.checked }))
                              }
                            />
                            <span>Registration Fee ({formatCurrency(currency, school.extras.find((e) => e.id === "registration")?.amount || 0)})</span>
                          </label>
        
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="size-4"
                              checked={!!selectedExtras["textbook"]}
                              onChange={(e) => setSelectedExtras((prev) => ({ ...prev, textbook: e.target.checked }))}
                            />
                            <span>Textbook ({formatCurrency(currency, school.extras.find((e) => e.id === "textbook")?.amount || 0)})</span>
                          </label>
        
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="size-4"
                              checked={!!selectedExtras["insurance"]}
                              onChange={(e) => setSelectedExtras((prev) => ({ ...prev, insurance: e.target.checked }))}
                            />
                            <span>Insurance ({formatCurrency(currency, school.extras.find((e) => e.id === "insurance")?.amount || 0)}/week)</span>
                          </label>
        
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="size-4"
                              checked={!!selectedExtras["accom-placement"]}
                              onChange={(e) =>
                                setSelectedExtras((prev) => ({ ...prev, ["accom-placement"]: e.target.checked }))
                              }
                            />
                            <span>
                              Accommodation Placement Fee ({formatCurrency(
                                currency,
                                school.extras.find((e) => e.id === "accom-placement")?.amount || 0
                              )})
                            </span>
                          </label>
        
                          {school.transfers && (
                            <div className="col-span-2">
                              <div className="mb-1 text-sm font-medium">Airport Transfer ({school.transfers.airportName})</div>
                              <div className="flex flex-wrap gap-2">
                                {(
                                  [
                                    { key: "none", label: "No transfer" },
                                    { key: "one_way", label: `One-way (${formatCurrency(currency, school.transfers.oneWay)})` },
                                    { key: "return", label: `Return (${formatCurrency(currency, school.transfers.return)})` },
                                  ] as { key: TransferOption; label: string }[]
                                ).map((opt) => (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setTransfer(opt.key)}
                                    className={`rounded-full border px-3 py-1 text-sm ${
                                      transfer === opt.key ? "border-blue-600 bg-blue-50" : "border-gray-300"
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
        
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="rounded-xl border border-gray-300 px-4 py-2 text-sm"
                          onClick={() => {
                            setWeeks(4);
                            setAccommodationId("none");
                            setAccomWeeks(4);
                            setTransfer("none");
                            const init: Record<string, boolean> = {};
                            school.extras.forEach((e) => e.defaultSelected && (init[e.id] = true));
                            setSelectedExtras(init);
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </section>
    )
}
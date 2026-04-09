"use client";
import { useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["M","T","W","T","F","S","S"];

const THEMES = {
  ocean: {
    name: "Ocean",
    grad: "from-[#1a7fd4] to-[#0c447c]",
    accent: "#1a7fd4",
    rangeClass: "bg-blue-100",
    rangeTextClass: "text-blue-900",
    lightClass: "bg-blue-50",
    borderClass: "border-blue-400",
    dotClass: "bg-blue-500",
    chipActive: "bg-blue-50 text-blue-700 border-blue-400",
  },
  forest: {
    name: "Forest",
    grad: "from-[#1d9e75] to-[#085041]",
    accent: "#1d9e75",
    rangeClass: "bg-emerald-100",
    rangeTextClass: "text-emerald-900",
    lightClass: "bg-emerald-50",
    borderClass: "border-emerald-400",
    dotClass: "bg-emerald-500",
    chipActive: "bg-emerald-50 text-emerald-700 border-emerald-400",
  },
  sunset: {
    name: "Sunset",
    grad: "from-[#e85d2e] to-[#6b1e0e]",
    accent: "#d85a30",
    rangeClass: "bg-orange-100",
    rangeTextClass: "text-orange-900",
    lightClass: "bg-orange-50",
    borderClass: "border-orange-400",
    dotClass: "bg-orange-500",
    chipActive: "bg-orange-50 text-orange-700 border-orange-400",
  },
  dusk: {
    name: "Dusk",
    grad: "from-[#7f77dd] to-[#3c3489]",
    accent: "#7f77dd",
    rangeClass: "bg-violet-100",
    rangeTextClass: "text-violet-900",
    lightClass: "bg-violet-50",
    borderClass: "border-violet-400",
    dotClass: "bg-violet-500",
    chipActive: "bg-violet-50 text-violet-700 border-violet-400",
  },
};

const HOLIDAYS = {
  "1-1": "New Year's Day",
  "2-14": "Valentine's Day",
  "3-8": "Women's Day",
  "10-31": "Halloween",
  "12-25": "Christmas",
  "12-31": "New Year's Eve",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function toKey(d) { return d ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` : ""; }
function sameDay(a, b) { return a && b && toKey(a) === toKey(b); }
function fmtShort(d) { return d ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}` : ""; }
function holidayKey(d) { return `${d.getMonth() + 1}-${d.getDate()}`; }

function buildCells(y, m) {
  let dow = new Date(y, m, 1).getDay();
  dow = dow === 0 ? 6 : dow - 1;
  const dim = new Date(y, m + 1, 0).getDate();
  const prev = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < dow; i++)
    cells.push({ day: prev - dow + 1 + i, cur: false, date: new Date(y, m - 1, prev - dow + 1 + i) });
  for (let i = 1; i <= dim; i++)
    cells.push({ day: i, cur: true, date: new Date(y, m, i) });
  while (cells.length % 7 !== 0)
    cells.push({ day: cells.length - dow - dim + 1, cur: false, date: new Date(y, m + 1, cells.length - dow - dim + 1) });
  return cells;
}

// ─── Nail ─────────────────────────────────────────────────────────────────────
function Nail() {
  return (
    <div className="flex justify-center -mb-1 z-20 relative">
      <div className="flex flex-col items-center">
        {/* Nail head */}
        <div
          className="w-4 h-4 rounded-full border border-gray-400 z-10"
          style={{
            background: "radial-gradient(circle at 35% 35%, #e5e7eb, #9ca3af)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.35), inset 0 1px 1px rgba(13, 12, 12, 0.5)",
          }}
        />
        {/* Nail pin going into wall */}
        <div className="w-0.5 h-2.5 bg-gray-500 -mb-0.5 " />
      </div>
    </div>
  );
}

// ─── Wire Rings ───────────────────────────────────────────────────────────────
function WireRings() {
  return (
    <div
      className="flex justify-center gap-2 md:gap-3 px-3 relative z-10"
      style={{ marginTop: -2 }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-3 rounded-full border-[1.5px] border-gray-400"
          style={{
            background: "radial-gradient(circle at 35% 30%, #f3f4f6, #9ca3af)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ month, year, theme, animating, animDir }) {
  return (
    <div
      className={`relative h-48 bg-gradient-to-br ${theme.grad} overflow-hidden transition-all duration-200 `}
      style={{
        opacity: animating ? 0 : 1,
        transform: animating
          ? animDir === "next" ? "translateX(-8px)" : "translateX(8px)"
          : "none",
      }}
    >
      {/* Blobs */}
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-3 left-10 w-16 h-16 rounded-full bg-white/5" />

      {/* Mountain silhouette */}
      <svg viewBox="0 0 900 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
        <polygon points="0,100 120,30 260,70 400,10 540,55 680,20 820,60 900,35 900,100" fill="white" opacity="0.10" />
        <polygon points="0,100 80,55 200,80 360,35 500,68 660,40 800,65 900,50 900,100" fill="white" opacity="0.16" />
      </svg>

      {/* Badge */}
      <div className="absolute bottom-2 right-3 text-right">
        <span className="block text-[9px] font-mono tracking-widest text-white/60">{year}</span>
        <span className="block text-lg font-bold tracking-widest uppercase text-white leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {MONTHS[month]}
        </span>
      </div>

    </div>
  );
}

// ─── Day Cell ─────────────────────────────────────────────────────────────────
function DayCell({ cell, idx, lo, hi, previewEnd, rangeStart, rangeEnd, today, theme, notes, onClick, onMouseEnter, onMouseLeave }) {
  const { date, cur, day } = cell;
  const dow = date.getDay();
  const isWeekend = dow === 0 || dow === 6;
  const isToday = sameDay(date, today);
  const isStart = sameDay(date, lo);
  const isEnd = sameDay(date, hi) && !sameDay(lo, hi);
  const inRange = lo && hi && date > lo && date < hi;
  const inPreview = previewEnd && rangeStart && !rangeEnd &&
    ((date > rangeStart && date < previewEnd) || (date < rangeStart && date > previewEnd));
  const isPreviewEnd = previewEnd && sameDay(date, previewEnd) && rangeStart && !rangeEnd;
  const hasNote = !!notes[toKey(date)];
  const isHoliday = !!HOLIDAYS[holidayKey(date)];
  const isSelected = isStart || isEnd || isPreviewEnd;
  const col = idx % 7;

  let cls = "relative flex items-center justify-center text-[10px] select-none transition-colors duration-100 ";
  if (!cur) cls += "opacity-25 cursor-default ";
  else cls += "cursor-pointer ";

  if (isSelected) cls += "rounded-full ";
  else if (inRange || inPreview) {
    if (col === 0) cls += "rounded-l-full ";
    else if (col === 6) cls += "rounded-r-full ";
    else cls += "rounded-none ";
  } else cls += "rounded-full ";

  if (inRange) cls += `${theme.rangeClass} ${theme.rangeTextClass} `;
  else if (inPreview) cls += `${theme.lightClass} ${theme.rangeTextClass} opacity-60 `;
  if (cur && !isSelected && !inRange && !inPreview) cls += "hover:bg-gray-100 ";

  return (
    <div
      className={`${cls} ${isToday ? "font-bold" : "font-normal"}`}
      style={{
        aspectRatio: "1",
        backgroundColor: isSelected ? theme.accent : undefined,
        color: isSelected ? "#fff" : isWeekend && cur && !inRange && !inPreview ? theme.accent : undefined,
        ...(isToday && !isSelected ? { outline: `1.5px solid ${theme.accent}`, outlineOffset: -1 } : {}),
      }}
      onClick={() => cur && onClick(date)}
      onMouseEnter={() => cur && onMouseEnter(date)}
      onMouseLeave={onMouseLeave}
      title={isHoliday ? HOLIDAYS[holidayKey(date)] : undefined}
    >
      {day}
      {hasNote && cur && <span className={`absolute top-0 right-0 w-1 h-1 rounded-full ${isSelected ? "bg-white" : theme.dotClass}`} />}
      {isHoliday && cur && <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-amber-400"}`} />}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function WallCalendar() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [cur, setCur] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [noteText, setNoteText] = useState("");
  const [themeKey, setThemeKey] = useState("ocean");
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  const theme = THEMES[themeKey];
  const cells = buildCells(cur.getFullYear(), cur.getMonth());
  const lo = rangeStart && rangeEnd ? (rangeStart <= rangeEnd ? rangeStart : rangeEnd) : rangeStart;
  const hi = rangeStart && rangeEnd ? (rangeStart <= rangeEnd ? rangeEnd : rangeStart) : rangeStart;

  function changeMonth(dir) {
    setAnimDir(dir > 0 ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => { setCur(c => new Date(c.getFullYear(), c.getMonth() + dir, 1)); setAnimating(false); }, 220);
  }

  function handleDayClick(date) {
    if (!rangeStart || rangeEnd) {
      setRangeStart(new Date(date)); setRangeEnd(null);
      setNoteText(notes[toKey(date)]?.text || "");
    } else {
      let s = rangeStart, e = new Date(date);
      if (e < s) [s, e] = [e, s];
      setRangeStart(s); setRangeEnd(e);
      setNoteText(notes[toKey(s)]?.text || "");
    }
  }

  function saveNote() {
    if (!rangeStart || !noteText.trim()) return;
    setNotes(n => ({ ...n, [toKey(rangeStart)]: { text: noteText.trim(), start: new Date(rangeStart), end: rangeEnd ? new Date(rangeEnd) : new Date(rangeStart) } }));
  }

  function deleteNote(k) { setNotes(n => { const x = { ...n }; delete x[k]; return x; }); }
  function restoreNote(n) { setRangeStart(new Date(n.start)); setRangeEnd(new Date(n.end)); setNoteText(n.text); setCur(new Date(n.start.getFullYear(), n.start.getMonth(), 1)); }

  const rangeLabel = !rangeStart ? "Tap a date to start"
    : !rangeEnd ? `${fmtShort(rangeStart)} → ?`
    : sameDay(rangeStart, rangeEnd) ? fmtShort(rangeStart)
    : `${fmtShort(lo)} → ${fmtShort(hi)}`;

  return (
    /* ── Wall ── */
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-start pt-16 pb-16 px-4"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.03) 39px, rgba(0,0,0,0.03) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.03) 39px, rgba(0,0,0,0.03) 40px)
        `,
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap" rel="stylesheet" />

      {/* Nail on wall */}
      <Nail />

      {/* Calendar hanging — slight tilt for realism */}
      <div
        className="w-full"
        style={{
          maxWidth: 500,
          /* Wall shadow: diffuse ambient + directional drop */
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.28)) drop-shadow(0 2px 6px rgba(0,0,0,0.18))",
          transform: "rotate(-0.4deg)",
          transformOrigin: "top center",
        }}
      >
        {/* Wire rings */}
        <WireRings />

        {/* Calendar card */}
        <div className="bg-white rounded-b-xl rounded-t-sm overflow-hidden border border-gray-200 w-full"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}
        >
          {/* Hero */}
          <Hero
            month={cur.getMonth()}
            year={cur.getFullYear()}
            theme={theme}
            animating={animating}
            animDir={animDir}
          />

          {/* Theme chips */}
          <div className="flex justify-center gap-1 px-2 pt-1.5 pb-1 bg-gray-50 border-b border-gray-100">
            {Object.entries(THEMES).map(([k, t]) => (
              <button key={k} onClick={() => setThemeKey(k)}
                className={`text-[8px] px-2 py-0.5 rounded-full border font-semibold transition-all duration-150 ${k === themeKey ? t.chipActive : "bg-transparent border-gray-200 text-gray-400"}`}>
                {t.name}
              </button>
            ))}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-b border-gray-100">
            <button onClick={() => changeMonth(-1)}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 text-base leading-none hover:bg-gray-100 transition-colors">
              ‹
            </button>
            <span className="text-[11px] font-semibold text-gray-700 tracking-wide">
              {MONTHS[cur.getMonth()]} {cur.getFullYear()}
            </span>
            <button onClick={() => changeMonth(1)}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 text-base leading-none hover:bg-gray-100 transition-colors">
              ›
            </button>
          </div>

          {/* Grid */}
          <div className="flex flex-col md:flex-row items-start justify-center w-full ">
             {/* Notes toggle strip */}
          <div className="border-t border-gray-100 bg-gray-50 md:w-1/2 w-full ">
            <button
              onClick={() => setShowNotes(v => !v)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              <span>Notes {Object.keys(notes).length > 0 && `(${Object.keys(notes).length})`}</span>
              <span className={`transition-transform duration-200 ${showNotes ? "rotate-180" : ""}`}>▾</span>
            </button>

            {showNotes && (
              <div className="px-3 pb-3 flex flex-col gap-2">
                {/* Range pill */}
                <div className={`text-[9px] font-medium px-2 py-1 rounded border-l-2 ${theme.lightClass} ${theme.borderClass} ${theme.rangeTextClass}`}>
                  {rangeLabel}
                </div>

                {/* Textarea */}
                <textarea
                  className="w-full resize-none rounded border border-gray-200 p-1.5 text-[10px] leading-relaxed text-gray-700 bg-white placeholder-gray-300 outline-none focus:border-gray-400"
                  rows={3}
                  placeholder="Type a note…"
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                />

                {/* Save */}
                <button onClick={saveNote}
                  className="text-[9px] font-semibold px-2 py-1 rounded border transition-all duration-150"
                  style={{ borderColor: theme.accent, color: theme.accent }}
                  onMouseEnter={e => { e.currentTarget.style.background = theme.accent; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.accent; }}>
                  Save ↵
                </button>

                {/* Saved notes */}
                {Object.keys(notes).length > 0 && (
                  <div className="flex flex-col gap-1 max-h-24 overflow-y-auto">
                    {Object.entries(notes).map(([k, n]) => {
                      const lbl = sameDay(n.start, n.end) ? fmtShort(n.start) : `${fmtShort(n.start)}–${fmtShort(n.end)}`;
                      return (
                        <div key={k} onClick={() => restoreNote(n)}
                          className={`flex items-center gap-1 text-[9px] px-2 py-1 bg-white rounded border border-gray-100 border-l-2 cursor-pointer hover:bg-gray-50 ${theme.borderClass}`}>
                          <span className="font-bold shrink-0" style={{ color: theme.accent }}>{lbl}</span>
                          <span className="text-gray-400 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{n.text}</span>
                          <button className="text-gray-300 hover:text-gray-500 bg-transparent border-none cursor-pointer p-0 text-[9px]"
                            onClick={e => { e.stopPropagation(); deleteNote(k); }}>✕</button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Clear */}
                <button onClick={() => { setRangeStart(null); setRangeEnd(null); setNoteText(""); }}
                  className="text-[8px] text-gray-300 hover:text-gray-500 underline self-end bg-transparent border-none cursor-pointer">
                  Clear selection
                </button>
              </div>
            )}
          </div>
            <div className="px-2.5 pt-2 pb-1 md:w-full w-full">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-0.5">
              {DAYS_SHORT.map((d, i) => (
                <div key={i} className="text-center text-[8px] font-semibold uppercase tracking-widest py-0.5"
                  style={{ color: i >= 5 ? theme.accent : "#d1d5db" }}>
                  {d}
                </div>
              ))}
            </div>
            {/* Cells */}
            <div className="grid grid-cols-7 gap-px">
              {cells.map((cell, idx) => (
                <DayCell key={idx} cell={cell} idx={idx} lo={lo} hi={hi}
                  previewEnd={rangeStart && !rangeEnd ? hoverDate : null}
                  rangeStart={rangeStart} rangeEnd={rangeEnd}
                  today={today} theme={theme} notes={notes}
                  onClick={handleDayClick}
                  onMouseEnter={setHoverDate}
                  onMouseLeave={() => setHoverDate(null)}
                />
              ))}
            </div>
          </div>

         

          </div>
          {/* Legend footer */}
          <div className="flex items-center justify-center gap-3 px-3 py-1.5 border-t border-gray-100 bg-white">
            {[
              { cls: "rounded-full", bg: theme.accent, label: "Sel" },
              { cls: "rounded-sm w-3.5", bg: null, rangeClass: theme.rangeClass, label: "Range" },
              { cls: "rounded-full", bg: "#fbbf24", label: "Holiday" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1 text-[8px] text-gray-400">
                <span className={`h-2 w-2 inline-block ${l.cls} ${l.rangeClass || ""}`}
                  style={l.bg ? { background: l.bg } : {}} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Cast shadow on wall below calendar — soft bottom edge */}
        <div className="mx-4 h-3 rounded-b-full"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.18) 0%, transparent 80%)" }} />
      </div>
    </div>
  );
}
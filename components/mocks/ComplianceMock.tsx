"use client";

import { motion } from "framer-motion";
import { Check, Document } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";

export function ComplianceMock() {
  const m = site.mocks.compliance;

  return (
    <div className="flex h-full flex-col text-[11px] sm:text-xs">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium sm:text-sm">{m.title}</p>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-ink/[0.1] px-2.5 py-1 text-[10px] font-medium text-ink/80">{m.status}</span>
          <span className="rounded-full bg-lime px-3 py-1 text-[10.5px] font-medium text-navy-900">{m.action}</span>
        </div>
      </div>

      <ul className="mt-3 divide-y divide-ink/[0.06] overflow-hidden rounded-xl border border-ink/[0.07] bg-white">
        {m.reports.map((report, i) => (
          <motion.li
            key={report.form}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.07 }}
            className="flex items-center gap-3 px-3 py-2"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-off-white text-navy-700">
              <Document />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{report.form}</p>
              <p className="truncate text-[10px] text-secondary">{report.scope}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-emerald-700">
              <Check className="h-3 w-3" />
              {report.state}
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-xl border border-ink/[0.07] bg-white p-3">
        <p className="text-[10px] text-secondary">{m.checksTitle}</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {m.checks.map((check, i) => (
            <li key={check} className="flex items-center gap-2">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <motion.path
                    d="M2.5 6.5l2.2 2.2L9.5 3.8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.5 + i * 0.15 }}
                  />
                </svg>
              </span>
              <span className="truncate">{check}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

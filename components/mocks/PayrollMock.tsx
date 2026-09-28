"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PayrollMock() {
  const m = site.mocks.payroll;

  return (
    <div className="flex h-full flex-col text-[11px] sm:text-xs">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] text-secondary">{m.periodLabel}</p>
          <p className="mt-0.5 text-[13px] font-medium sm:text-sm">{m.period}</p>
        </div>
        <span className="rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-medium text-white">{m.status}</span>
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-xl border border-ink/[0.07] bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-[10px] text-secondary">
              {m.columns.map((column, i) => (
                <th
                  key={column}
                  scope="col"
                  className={cn("px-3 py-2 font-normal", i === 1 && "hidden sm:table-cell", i >= 2 && "text-right")}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.rows.map((row, r) => (
              <motion.tr
                key={row[0]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + r * 0.06 }}
                className="border-t border-ink/[0.06]"
              >
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      "px-3 py-1.5 sm:py-2",
                      i === 0 && "font-medium",
                      i === 1 && "hidden text-secondary sm:table-cell",
                      i >= 2 && "text-right tabular-nums",
                      i === 4 && "font-medium",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] text-secondary">{m.footer.workers}</p>
          <p className="text-[13px] font-medium sm:text-sm">{m.footer.gross}</p>
        </div>
        <span className="rounded-full bg-lime px-3 py-1.5 text-[11px] font-medium text-navy-900">{m.action}</span>
      </div>

      <div className="mt-3 hidden sm:block">
        <div className="h-1 overflow-hidden rounded-full bg-ink/[0.06]">
          <motion.div
            className="h-full rounded-full bg-navy-700"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.5 }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-secondary">{m.progress}</p>
      </div>
    </div>
  );
}

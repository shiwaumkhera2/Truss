"use client";

import { motion } from "framer-motion";
import { site, type StatusCell, type StatusTone } from "@/content/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const dots: Record<StatusTone, string> = {
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
  bad: "bg-rose-500",
  muted: "bg-ink/25",
};

function Status({ cell }: { cell: StatusCell }) {
  const [label, tone] = cell;
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dots[tone])} />
      {label}
    </span>
  );
}

export function SubsMock() {
  const m = site.mocks.subs;

  return (
    <div className="flex h-full flex-col text-[11px] sm:text-xs">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium sm:text-sm">{m.title}</p>
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
                  className={cn("px-3 py-2 font-normal", i === 1 && "hidden sm:table-cell", i === 4 && "hidden md:table-cell")}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.rows.map((row, r) => (
              <motion.tr
                key={row.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + r * 0.06 }}
                className="border-t border-ink/[0.06]"
              >
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="hidden px-3 py-2 text-secondary sm:table-cell">{row.trade}</td>
                <td className="px-3 py-2">
                  <Status cell={row.insurance} />
                </td>
                <td className="px-3 py-2">
                  <Status cell={row.waiver} />
                </td>
                <td className="hidden px-3 py-2 md:table-cell">
                  <Status cell={row.w9} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-secondary">{m.footer}</p>
        <span className="shrink-0 rounded-full bg-navy-900 px-3 py-1.5 text-[11px] font-medium text-white">{m.action}</span>
      </div>
    </div>
  );
}

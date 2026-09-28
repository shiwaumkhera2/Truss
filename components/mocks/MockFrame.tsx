"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { Mark } from "@/components/ui/Logo";
import { PayrollMock } from "@/components/mocks/PayrollMock";
import { ComplianceMock } from "@/components/mocks/ComplianceMock";
import { SubsMock } from "@/components/mocks/SubsMock";
import { site, type FeatureId } from "@/content/site";
import { EASE } from "@/lib/motion";

const screens: Record<FeatureId, { title: string; crumb: string; Screen: React.ComponentType }> = {
  payroll: { title: site.mocks.payroll.title, crumb: site.mocks.payroll.crumb, Screen: PayrollMock },
  compliance: { title: site.mocks.compliance.title, crumb: site.mocks.compliance.crumb, Screen: ComplianceMock },
  subs: { title: site.mocks.subs.title, crumb: site.mocks.subs.crumb, Screen: SubsMock },
};

/** Navy device frame holding a light in-app screen. Screens crossfade when `active` changes. */
export function MockFrame({ active }: { active: FeatureId }) {
  const { title, crumb, Screen } = screens[active];

  return (
    <TiltCard max={3} lift={0} className="w-full">
      <div className="rounded-[24px] bg-navy-900 p-2 shadow-frame ring-1 ring-white/10 sm:rounded-[28px] sm:p-2.5">
        <div className="relative aspect-square overflow-hidden rounded-[18px] bg-off-white text-ink sm:aspect-[4/3] sm:rounded-[20px]">
          <div className="flex h-11 items-center justify-between border-b border-ink/[0.06] bg-white px-4">
            <div className="flex items-center gap-2">
              <Mark className="h-4 w-4" />
              <span className="font-serif text-[15px] leading-none">{site.name}</span>
            </div>
            <div className="hidden items-center gap-1.5 rounded-full border border-ink/[0.08] px-2.5 py-1 text-[10.5px] text-ink/70 sm:flex">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {crumb}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[10.5px] text-secondary">{title}</span>
              <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-navy-800 text-[9px] text-white">
                DL
              </span>
            </div>
          </div>

          <div className="relative h-[calc(100%-2.75rem)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 overflow-hidden p-3 sm:p-5"
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

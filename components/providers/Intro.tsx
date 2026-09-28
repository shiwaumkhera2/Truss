"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type IntroContextValue = {
  /** True once the preloader has lifted (or immediately when no preloader is present). */
  ready: boolean;
  finish: () => void;
};

const IntroContext = createContext<IntroContextValue>({ ready: true, finish: () => {} });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const finish = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, finish }), [ready, finish]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return useContext(IntroContext);
}

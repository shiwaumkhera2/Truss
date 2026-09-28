"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { LEAD_FIELDS, invalidFields, validateField, type LeadFieldName, type LeadFields } from "@/lib/lead";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<LeadFieldName, string>>;

const inputTypes: Record<LeadFieldName, string> = {
  name: "text",
  email: "email",
  phone: "tel",
  company: "text",
};

export function LeadForm() {
  const copy = site.hero.form;
  const idBase = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<LeadFields>({ name: "", email: "", phone: "", company: "" });
  const [touched, setTouched] = useState<Partial<Record<LeadFieldName, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const messageFor = (name: LeadFieldName) => copy.errors[name];

  const validateOne = (name: LeadFieldName, value: string) =>
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) ? undefined : messageFor(name) }));

  const onChange = (name: LeadFieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateOne(name, value);
    if (status === "error") setStatus("idle");
  };

  const onBlur = (name: LeadFieldName) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateOne(name, values[name]);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const invalid = invalidFields(values);
    setTouched({ name: true, email: true, phone: true, company: true });
    if (invalid.length) {
      const next: Errors = {};
      for (const name of invalid) next[name] = messageFor(name);
      setErrors(next);
      formRef.current?.querySelector<HTMLInputElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, source: "hero" }),
      });
      const json = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !json?.ok) throw new Error(`Lead request failed (${response.status})`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="lead-form" data-focus-first className="mx-auto w-full max-w-[1040px] scroll-mt-28">
      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.07] p-5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-6 lg:p-7">
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <SuccessPanel key="success" />
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h2 className="text-[15px] font-medium text-white/85">{copy.heading}</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.15fr_1.4fr_1fr_1.1fr_auto] lg:items-start lg:gap-3">
                {LEAD_FIELDS.map((name) => {
                  const field = copy.fields[name];
                  const id = `${idBase}-${name}`;
                  const error = touched[name] ? errors[name] : undefined;
                  return (
                    <div key={name}>
                      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-white/70">
                        {field.label}
                      </label>
                      <input
                        id={id}
                        name={name}
                        type={inputTypes[name]}
                        autoComplete={field.autoComplete}
                        inputMode={name === "phone" ? "tel" : name === "email" ? "email" : undefined}
                        placeholder={field.placeholder}
                        value={values[name]}
                        onChange={onChange(name)}
                        onBlur={onBlur(name)}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={cn(
                          "h-12 w-full rounded-xl border bg-white/[0.06] px-4 text-[15px] text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out-expo placeholder:text-white/35",
                          "hover:border-white/30 focus:border-lime focus:bg-white/[0.1] focus:shadow-[0_0_0_4px_rgba(232,255,106,0.16)]",
                          error ? "border-[#FF9A9A]/70" : "border-white/[0.14]",
                        )}
                      />
                      <AnimatePresence initial={false}>
                        {error && (
                          <motion.p
                            id={`${id}-error`}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="mt-1.5 text-xs text-[#FFB4B4]"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="sm:col-span-2 lg:col-span-1 lg:pt-7">
                  <Button
                    type="submit"
                    variant="lime"
                    size="md"
                    loading={status === "submitting"}
                    className="w-full lg:w-auto"
                  >
                    {status === "submitting" ? copy.submitting : copy.submit}
                  </Button>
                </div>
              </div>

              {/* Honeypot: real people never see or fill this field. */}
              <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor={`${idBase}-website`}>Website</label>
                <input
                  id={`${idBase}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-white/50">
                <p>{copy.note}</p>
                <div aria-live="polite">
                  {status === "error" && (
                    <p className="text-[#FFB4B4]">
                      {copy.errors.server}{" "}
                      <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-2">
                        {site.contactEmail}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SuccessPanel() {
  const copy = site.hero.form.success;
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[168px] flex-col items-center justify-center gap-5 py-4 text-center sm:flex-row sm:gap-7 sm:text-left"
    >
      <motion.div
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.05 }}
        className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-lime text-navy-900"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          />
        </svg>
      </motion.div>
      <div>
        <p className="font-serif text-3xl tracking-[-0.02em] sm:text-4xl">{copy.title}</p>
        <p className="mt-2 text-white/70">{copy.body}</p>
      </div>
    </motion.div>
  );
}

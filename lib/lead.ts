/**
 * Shared lead-form types and validation, used by both the client form
 * and the /api/lead route so the rules can never drift apart.
 */

export type LeadFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export type LeadFieldName = keyof LeadFields;

export const LEAD_FIELDS: LeadFieldName[] = ["name", "email", "phone", "company"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(name: LeadFieldName, raw: string): boolean {
  const value = raw.trim();
  switch (name) {
    case "name":
      return value.length >= 2 && value.length <= 120;
    case "email":
      return EMAIL_RE.test(value) && value.length <= 254;
    case "phone": {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }
    case "company":
      return value.length >= 2 && value.length <= 160;
  }
}

/** Returns the names of every invalid field (empty array when the lead is valid). */
export function invalidFields(values: Partial<Record<LeadFieldName, unknown>>): LeadFieldName[] {
  return LEAD_FIELDS.filter((name) => {
    const v = values[name];
    return typeof v !== "string" || !validateField(name, v);
  });
}

export type ValidationResult = { ok: true; data: LeadFields } | { ok: false; invalid: LeadFieldName[] };

export function validateLead(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, invalid: [...LEAD_FIELDS] };
  }
  const record = input as Record<string, unknown>;
  const invalid = invalidFields(record);
  if (invalid.length) return { ok: false, invalid };
  return {
    ok: true,
    data: {
      name: String(record.name).trim(),
      email: String(record.email).trim().toLowerCase(),
      phone: String(record.phone).trim(),
      company: String(record.company).trim(),
    },
  };
}

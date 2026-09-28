import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: site.legal.terms.title };

export default function TermsPage() {
  return <LegalPage {...site.legal.terms} />;
}

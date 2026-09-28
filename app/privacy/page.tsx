import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: site.legal.privacy.title };

export default function PrivacyPage() {
  return <LegalPage {...site.legal.privacy} />;
}

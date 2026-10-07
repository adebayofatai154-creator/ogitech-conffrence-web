import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { PageHeader, Eyebrow, Section } from "@/components/site/Section";
import { Pricing } from "@/components/home/Registration";
import { CopyRow } from "@/components/public/CopyRow";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Registration fees for physical, virtual and international participants, and payment details for the 2nd Hybrid International Conference.",
  alternates: { canonical: "/registration" },
};

export default function RegistrationPage() {
  const bank = siteConfig.bank;
  const ads = siteConfig.advertisement;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Registration" }]}
        title="Registration"
        intro="Choose physical or virtual attendance. Fees are in Nigerian Naira (₦) unless stated."
      />

      <Section labelledBy="fees-title">
        <Eyebrow>Fees</Eyebrow>
        <h2 id="fees-title" className="s-title" style={{ marginBottom: 32 }}>
          Registration fees
        </h2>
        <Pricing />
      </Section>

      <Section tone="off" labelledBy="pay-title">
        <div className="s-pay">
          <div className="s-panel">
            <Eyebrow>Payment</Eyebrow>
            <h3 id="pay-title">Payment information</h3>
            <div className="s-kv">
              <span className="k">Account name</span>
              <span className="v">{bank.accountName}</span>
            </div>
            <div className="s-kv">
              <span className="k">Bank</span>
              <span className="v">{bank.bankName}</span>
            </div>
            <div className="s-kv" style={{ marginBottom: 0 }}>
              <span className="k">Account number</span>
              <CopyRow value={bank.accountNumber} />
            </div>
          </div>

          <div className="s-panel">
            <Eyebrow>Book of Abstract</Eyebrow>
            <h3>Advertisement in the Conference Book of Abstract</h3>
            <ul className="s-adrates">
              <li>
                <span>Full page</span>
                <strong>{ads.fullPage}</strong>
              </li>
              <li>
                <span>Half page</span>
                <strong>{ads.halfPage}</strong>
              </li>
              <li>
                <span>Quarter page</span>
                <strong>{ads.quarterPage}</strong>
              </li>
            </ul>
          </div>
        </div>
        {/* <p className="s-note" style={{ marginTop: 28 }}>
          Questions about registration or payment? <Link href="/#contact" style={{ fontWeight: 600 }}>Contact the conference secretariat</Link>.
        </p> */}
      </Section>
    </>
  );
}

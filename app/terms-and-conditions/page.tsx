import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The rules for using the aadyosh website and enrolling in our programs.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
    <div className="anim-page">
        <section className="page-hero">
          <div className="container">
            <h1>
              Terms &{" "}
              <span className="highlight">Conditions</span>
            </h1>
            <p className="lead">
              The rules for using the aadyosh website, creating an account, and taking part in our programs.
            </p>
          </div>
        </section>
        <section className="legal-wrap">
          <div className="container">
            <article className="legal-doc">
              <p className="meta">Last updated: 18 September 2026</p>
              <h2 className="first">1. Agreement</h2>
              <p>
                These terms are between you and Aadyosh Corporate Private Limited, Anand Nagar, Nagpur ("aadyosh", "we", "us"). By using this website, creating an account, or enrolling in a program, you agree to them together with our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
                . If you do not agree, please do not use the platform.
              </p>
              <h2>2. Eligibility and accounts</h2>
              <ul>
                <li>You must be 18 or older, or have a parent or guardian's consent to use aadyosh.</li>
                <li>
                  Accounts are created and secured through our authentication provider, Clerk. Give accurate details and keep your sign-in credentials confidential.
                </li>
                <li>
                  You are responsible for everything that happens under your account. Tell us promptly if you think it has been misused.
                </li>
                <li>
                  You can ask us to delete your account at any time by emailing{" "}
                  <a href="mailto:hr@aadyosh.com?subject=Account%20Deletion%20Request">hr@aadyosh.com</a>
                  {" "}from the address on your account.
                </li>
              </ul>
              <h2>3. Programs and content</h2>
              <ul>
                <li>Program content, recordings, and materials are for your personal learning only.</li>
                <li>
                  You may not copy, resell, share, or publish course materials without our written permission.
                </li>
                <li>Content access lasts for the period stated at enrolment.</li>
                <li>
                  We may update program content, schedules, and mentors to keep programs current. Batch dates and seat counts shown on the site can change.
                </li>
              </ul>
              <h2>4. Fees and payments</h2>
              <p>
                Fees are shown at the time of enrolment and are processed by our payment provider [name]. Refunds and cancellations are governed by our{" "}
                <Link href="/refund-policy">Pricing & Refund Policy</Link>
                {" "}and{" "}
                <Link href="/return-policy">Program Change & Rescheduling Policy</Link>
                .
              </p>
              <h2>5. Certificates and evaluation</h2>
              <p>
                Certificates are issued when your deliverables pass mentor review. Attendance alone does not qualify for a certificate. We guarantee an internship to learners enrolled in the Fellowship plan; we do not guarantee a job or any other specific career outcome.
              </p>
              <h2>6. Campus Captain programme</h2>
              <ul>
                <li>
                  Applying does not guarantee selection; we choose Captains at our discretion based on the programme's criteria.
                </li>
                <li>
                  Captains are volunteers and representatives of the programme — not employees, agents, or partners of aadyosh — unless we agree otherwise in writing.
                </li>
                <li>
                  Recognition, certificates, or rewards depend on the tier requirements published for the programme and may change.
                </li>
                <li>
                  Captains must describe aadyosh and its programs accurately, must not make promises we have not made (for example guaranteed jobs), and must not collect payments on our behalf.
                </li>
                <li>We may remove a Captain who breaks these terms or misrepresents aadyosh.</li>
              </ul>
              <h2>7. Support requests and chat</h2>
              <p>
                Messages sent through our forms and live chat are used to help you and to keep a record of what was agreed. Live chat is provided through tawk.to and conversations may be stored. Never share passwords, card numbers, or OTPs in a form or chat — we will never ask for them.
              </p>
              <h2>8. Acceptable use</h2>
              <ul>
                <li>Do not submit work that is not your own, or that infringes anyone's rights.</li>
                <li>Do not harass mentors or other learners, or disrupt live sessions.</li>
                <li>
                  Do not submit false or someone else's details in our forms, or use automated tools to flood them.
                </li>
                <li>
                  Do not attempt to access other people's accounts, probe for security weaknesses, or interfere with the platform.
                </li>
              </ul>
              <p>We may suspend or end access for breaches of these terms.</p>
              <h2>9. Third-party services</h2>
              <p>
                The platform relies on services we do not control, such as Clerk (sign-in), tawk.to (chat), and Google (spreadsheets and fonts). Their availability and terms are their own, and links from our site to other websites are provided for convenience only.
              </p>
              <h2>10. Intellectual property</h2>
              <p>
                The platform, branding, and materials belong to aadyosh or its licensors. You keep ownership of the projects you create, and you grant us permission to display them in a learning context (for example mentor review) unless you tell us otherwise.
              </p>
              <h2>11. Availability and disclaimers</h2>
              <p>
                We aim to keep the site running smoothly but provide it "as is" and cannot promise it will always be uninterrupted or error-free. Information on the site is general guidance about our programs, not professional, legal, or financial advice.
              </p>
              <h2>12. Limitation of liability</h2>
              <p>
                To the extent the law allows, aadyosh is not liable for indirect or consequential losses arising from your use of the platform. Our total liability is limited to the fees you paid for the relevant program. Nothing in these terms limits liability that cannot be limited by law.
              </p>
              <h2>13. Suspension and termination</h2>
              <p>
                You may stop using aadyosh at any time. We may suspend or close accounts that breach these terms or the law. Sections that by their nature should continue (such as intellectual property and liability) survive termination.
              </p>
              <h2>14. Governing law</h2>
              <p>
                These terms are governed by the laws of [your jurisdiction], and disputes are subject to the courts of [your city].
              </p>
              <h2>15. Changes and contact</h2>
              <p>
                We may update these terms and will change the "last updated" date when we do; continuing to use the platform means you accept the updated terms. Questions? Write to{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                .
              </p>
            </article>
          </div>
        </section>
    </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Program Change & Rescheduling Policy",
  description: "How to switch aadyosh programs, move to a later batch, or handle a cohort we reschedule.",
};

export default function ReturnPolicyPage() {
  return (
    <>
    <div className="anim-page">
        <section className="page-hero">
          <div className="container">
            <h1>
              Program Change &{" "}
              <span className="highlight">Rescheduling Policy</span>
            </h1>
            <p className="lead">How to switch programs, move to a later batch, or handle a cohort we reschedule.</p>
          </div>
        </section>
        <section className="legal-wrap">
          <div className="container">
            <article className="legal-doc">
              <p className="meta">Last updated: 18 September 2026</p>
              <h2 className="first">1. What this policy covers</h2>
              <p>
                aadyosh delivers live, cohort-based programs, so there is nothing physical to send back. This policy explains how to switch to a different program, move to a later batch, and what happens if we need to reschedule or cancel a cohort. Cancelling instead of switching or rescheduling is covered by our{" "}
                <Link href="/refund-policy">Pricing & Refund Policy</Link>
                .
              </p>
              <h2>2. Changing your program</h2>
              <p>
                You can request to switch from your enrolled program to a different aadyosh program before your batch's first live session, if:
              </p>
              <ul>
                <li>The request is raised before the first live session of your enrolled batch.</li>
                <li>The program you want to switch to has an open batch with available seats.</li>
                <li>
                  If the new program costs more, you pay the difference; if it costs less, the difference is credited towards a future purchase rather than refunded, unless the checkout page for that program says otherwise.
                </li>
              </ul>
              <p>
                To request a switch, email{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                {" "}with your full name, registered phone or email, your current program, and the program you would like to move to. We will confirm seat availability and, if a payment difference applies, share how to pay it before your access is moved.
              </p>
              <h2>3. Moving to a later batch</h2>
              <p>
                If you cannot join your assigned batch, you can ask to move to a later batch of the same program before that batch's first live session, subject to seat availability. Moving to a later batch does not by itself change your program — to also switch programs, follow section 2.
              </p>
              <h2>4. If we reschedule or cancel a batch</h2>
              <p>
                We may need to reschedule or cancel a batch or session for reasons such as low enrolment, mentor unavailability, or circumstances outside our control. If this happens, we will contact you with your options, which may include moving to the next available batch or a refund under our{" "}
                <Link href="/refund-policy">Pricing & Refund Policy</Link>
                .
              </p>
              <h2>5. How to request a change</h2>
              <p>
                Email{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                {" "}or raise a ticket on the{" "}
                <Link href="/support">Support</Link>
                {" "}page with:
              </p>
              <ul>
                <li>Full name and the email or phone number you enrolled with.</li>
                <li>Your current program and batch.</li>
                <li>The program or batch you would like to move to.</li>
                <li>Reason for the request (optional, but it helps us process it faster).</li>
              </ul>
              <p>We aim to confirm program changes and rescheduling requests within 3–5 working days.</p>
              <h2>6. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The "last updated" date above shows when it last changed.
              </p>
              <h2>7. Contact</h2>
              <p>
                Questions about switching programs or batches? Write to{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                {" "}or use the{" "}
                <Link href="/support">Support</Link>
                {" "}page.
              </p>
            </article>
          </div>
        </section>
    </div>
    </>
  );
}

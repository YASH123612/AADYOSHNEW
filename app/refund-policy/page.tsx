import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing & Refund Policy",
  description: "How aadyosh pricing works and when you can get a refund.",
};

export default function RefundPolicyPage() {
  return (
    <>
    <div className="anim-page">
        <section className="page-hero">
          <div className="container">
            <h1>
              Pricing & Refund{" "}
              <span className="highlight">Policy</span>
            </h1>
            <p className="lead">
              How our pricing works, why payments are non-refundable, and how duplicate payments are handled.
            </p>
          </div>
        </section>
        <section className="legal-wrap">
          <div className="container">
            <article className="legal-doc">
              <p className="meta">Last updated: 25 October 2026</p>
              <h2 className="first" id="scope">1. Scope</h2>
              <p>
                This policy explains how aadyosh ("we", "us") handles pricing, cancellations, refunds, and duplicate payments for programs purchased on this website. When you pay for a program, you also agree to our{" "}
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
                {" "}and{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
                .
              </p>
              <h2 id="pricing">2. Transparent pricing</h2>
              <p>
                The fee for each program is shown before you pay, along with what it includes. Where a price is confirmed on a screening call, the amount agreed on that call is the amount you pay. Discounts and launch offers are described at the time they apply and may not be available afterwards.
              </p>
              <h2 id="no-refunds">3. Payments are non-refundable</h2>
              <p>
                Once a payment has been successfully processed, it is{" "}
                <strong>non-refundable</strong>
                . This applies whether you attend every session or none, and whether you cancel before or after your batch starts.
              </p>
              <div className="legal-note">
                <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "6px" }}></i>
                Please read this before you pay. Ask your questions on the screening call first, because we cannot reverse a completed payment.
              </div>
              <p>
                The only exceptions are the ones listed in section 4 below, or a cancellation window that is stated on the checkout page of a specific program. If a program offers such a window, the checkout page is what applies to that program.
              </p>
              <ul>
                <li>
                  Moving to a later batch or a different program is not a refund — see our{" "}
                  <Link href="/return-policy">Program Change & Rescheduling Policy</Link>
                  .
                </li>
                <li>
                  Any scholarship, discount, or fee-benefit that a program describes is separate from a cancellation refund and follows the conditions stated with that offer.
                </li>
              </ul>
              <h2 id="exceptions">4. The exceptions</h2>
              <ul>
                <li>
                  <strong>Duplicate or incorrect charge:</strong>
                  {" "}you were charged twice for the same enrolment, or charged an amount that does not match the price you agreed to. We refund the difference after verifying it (see section 7).
                </li>
                <li>
                  <strong>Cohort cancelled by us:</strong>
                  {" "}we cancel your batch and cannot offer you a seat in a comparable one within a reasonable time.
                </li>
                <li>
                  <strong>A program page says otherwise:</strong>
                  {" "}the checkout page of that program states a cancellation window, and your request falls inside it.
                </li>
              </ul>
              <h2 id="why">5. Why refunds are restricted</h2>
              <p>
                Our programs run in cohorts, and most of what we spend on you is committed the moment you enrol:
              </p>
              <ul>
                <li>
                  <strong>Limited seats:</strong>
                  {" "}each batch has a fixed number of places, and a withdrawal part-way through cannot be filled by someone else.
                </li>
                <li>
                  <strong>Reserved time:</strong>
                  {" "}mentor sessions, project review capacity, and evaluation effort are set aside for you before the batch begins.
                </li>
                <li>
                  <strong>Early costs:</strong>
                  {" "}payment processing, onboarding, and support start straight away.
                </li>
                <li>
                  <strong>Access starts early:</strong>
                  {" "}you can usually reach materials, the community, and scheduling soon after you enrol, before the batch itself starts.
                </li>
              </ul>
              <h2 id="not-available">6. Situations that are not refunded</h2>
              <ul>
                <li>You stop attending, change your mind, or can no longer commit the time.</li>
                <li>
                  Your account is suspended or closed for breaching our{" "}
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  .
                </li>
                <li>
                  You did not receive a job or interview call. We do not guarantee those outcomes (see our{" "}
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  ).
                </li>
                <li>
                  Services already delivered, such as a completed mock interview, resume review, or 1:1 mentor session.
                </li>
              </ul>
              <h2 id="duplicate">7. Duplicate or incorrect payments</h2>
              <p>
                If you are charged twice for the same order, or charged an amount you did not agree to, we will refund the extra amount once we have verified it. Email{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                {" "}with both payment references (or screenshots), your registered email or phone number, and the program name.
              </p>
              <h2 id="changes">8. Changing your cohort or program</h2>
              <p>
                If you cannot join your assigned batch, you can ask to move to a later cohort of the same program, or switch to a different program, before your batch's first live session. This is handled under our{" "}
                <Link href="/return-policy">Program Change & Rescheduling Policy</Link>
                , not as a refund, and depends on seat availability in the new batch.
              </p>
              <h2 id="request">9. How to make a request</h2>
              <p>
                For a duplicate payment, a cancelled cohort, or any refund question, email{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                {" "}from your registered email address, or raise a ticket on the{" "}
                <Link href="/support">Support</Link>
                {" "}page. Include:
              </p>
              <ul>
                <li>Your full name and the email or phone number you enrolled with.</li>
                <li>Program name and batch.</li>
                <li>Payment reference or transaction ID.</li>
                <li>What happened (a screenshot of a duplicate charge helps).</li>
              </ul>
              <p>We aim to review and respond within 3–5 working days.</p>
              <h2 id="payout">10. How approved refunds are paid</h2>
              <p>
                Approved refunds go back to the original payment method where the payment provider allows it; otherwise we will agree another method with you. How long it takes to reach you depends on the payment gateway and your bank or card network, so it can take several working days after we approve it.
              </p>
              <h2 id="updates">11. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The "last updated" date above shows when it last changed. Continuing to use aadyosh after a change means you accept the updated policy.
              </p>
              <h2 id="contact">12. Contact</h2>
              <p>
                Questions about pricing or refunds? Write to{" "}
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

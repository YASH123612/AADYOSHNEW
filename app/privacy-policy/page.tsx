import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How aadyosh collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
    <div className="anim-page">
        <section className="page-hero">
          <div className="container">
            <h1>
              Privacy{" "}
              <span className="highlight">Policy</span>
            </h1>
            <p className="lead">
              What aadyosh collects when you use this site, why we collect it, who helps us handle it, and how you stay in control.
            </p>
          </div>
        </section>
        <section className="legal-wrap">
          <div className="container">
            <article className="legal-doc">
              <p className="meta">Last updated: 18 September 2026</p>
              <h2 className="first">1. Who we are</h2>
              <p>
                aadyosh ("we", "us") operates this website and the aadyosh learning platform. We decide why and how the personal information described below is used. Registered entity: Aadyosh Corporate Private Limited, Anand Nagar, Nagpur. General contact:{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                .
              </p>
              <h2>2. Information we collect</h2>
              <p>We only ask for what each form needs. Here is exactly what goes where:</p>
              <ul>
                <li>
                  <strong>Roadmap request (homepage pop-up):</strong>
                  {" "}full name, phone number, college, graduation year, state, and department.
                </li>
                <li>
                  <strong>Support request:</strong>
                  {" "}topic, full name, email, phone number (optional), and your message.
                </li>
                <li>
                  <strong>Campus Captain application:</strong>
                  {" "}full name, email, phone number, college, graduation year, and who referred you (optional).
                </li>
                <li>
                  <strong>Account deletion request:</strong>
                  {" "}full name, account email, an optional reason, and your confirmation.
                </li>
                <li>
                  <strong>Your account:</strong>
                  {" "}when you create an account or sign in, our authentication provider (Clerk) processes your email address, name, sign-in method, and session information. We never see or store your password.
                </li>
                <li>
                  <strong>Live chat:</strong>
                  {" "}messages you send in the chat window, plus any name or email you give there, and technical details such as your IP address and browser that the chat provider (tawk.to) receives.
                </li>
                <li>
                  <strong>Automatic data:</strong>
                  {" "}which page a form was sent from, and standard server and security logs (for example IP address, browser type, and time of request).
                </li>
                <li>
                  <strong>Enrolment and learning data:</strong>
                  {" "}when you join a program — enrolment details, project submissions, assessment results, and mentor feedback.
                </li>
                <li>
                  <strong>Payments:</strong>
                  {" "}handled by our payment provider [name]. We do not store full card numbers.
                </li>
              </ul>
              <h2>3. How we use your information</h2>
              <ul>
                <li>To reply to your enquiry and send the program roadmap you asked for.</li>
                <li>To answer support requests and process account deletion requests.</li>
                <li>To review Campus Captain applications and run the programme.</li>
                <li>
                  To create and secure your account, and to deliver programs, evaluate work, and issue certificates.
                </li>
                <li>To protect the site from spam and abuse, and to meet legal obligations.</li>
                <li>To understand how the site is used so we can improve it.</li>
              </ul>
              <p>
                Where the law requires your consent (for example to contact you about programs), we rely on it, and you can withdraw it at any time.
              </p>
              <h2>4. Who we share it with</h2>
              <p>
                We do not sell your personal information. We share it only with providers that help us run the site, under their own privacy terms:
              </p>
              <ul>
                <li>
                  <strong>Clerk</strong>
                  {" "}— account creation, sign-in, and session security.
                </li>
                <li>
                  <strong>tawk.to</strong>
                  {" "}— the live chat window, including chat history.
                </li>
                <li>
                  <strong>Google (Google Sheets and Drive)</strong>
                  {" "}— form submissions are also copied into Google Sheets that only authorised aadyosh team members can open, so we can follow up quickly.
                </li>
                <li>
                  <strong>Hosting and infrastructure</strong>
                  {" "}— [hosting provider], where the site and its database run.
                </li>
                <li>
                  <strong>Payment provider</strong>
                  {" "}— [name], when you pay for a program.
                </li>
                <li>
                  <strong>Hiring partners</strong>
                  {" "}— only when you choose to be considered for a role.
                </li>
              </ul>
              <p>
                Your browser also contacts Google Fonts and the Font Awesome CDN to load fonts and icons, which means those services can see your IP address. We may also disclose information where the law or a valid legal process requires it.
              </p>
              <h2>5. Contacting you</h2>
              <p>
                If you share your phone number, we may reach out by call, SMS, or WhatsApp about your enquiry, application, or enrolment. If you would rather not be contacted, tell us and we will stop.
              </p>
              <h2>6. Cookies and similar storage</h2>
              <ul>
                <li>
                  <strong>Essential:</strong>
                  {" "}Clerk sets cookies to keep you signed in and to protect your session.
                </li>
                <li>
                  <strong>Chat:</strong>
                  {" "}tawk.to may set cookies to remember an ongoing conversation.
                </li>
                <li>
                  <strong>Site preferences:</strong>
                  {" "}your browser's session storage remembers, for that visit only, that you have already seen or completed the roadmap pop-up.
                </li>
              </ul>
              <p>
                You can block or clear cookies in your browser settings; sign-in and chat may stop working if you do.
              </p>
              <h2>7. How long we keep it</h2>
              <p>
                We keep personal information only as long as needed for the purposes above or as the law requires. Typical periods: enquiries and roadmap requests [12 months]; support tickets [24 months]; Campus Captain applications [24 months]; account and learning records for as long as your account is active plus [period]; deletion requests [period] as proof that we acted on them. After that we delete or anonymise the data.
              </p>
              <h2>8. Security</h2>
              <p>
                We validate what is submitted through our forms, limit how often a form can be sent, restrict database and spreadsheet access to authorised team members, and rely on established providers for sign-in. No system is completely secure, so we cannot guarantee absolute security — please use a strong, unique password and never share it with anyone, including in chat.
              </p>
              <h2>9. Your rights and choices</h2>
              <p>
                You can ask to access, correct, or erase your personal information, withdraw consent you have given, or raise a complaint about how we handle it. To delete your account, email{" "}
                <a href="mailto:hr@aadyosh.com?subject=Account%20Deletion%20Request">hr@aadyosh.com</a>
                {" "}from the address on your account with the subject "Account Deletion Request". For anything else, write to the contact below and we will respond within [30] days.
              </p>
              <h2>10. Where your data is processed</h2>
              <p>
                Some of our providers (such as Clerk, tawk.to, and Google) may process data on servers outside India. We use providers that describe appropriate safeguards for such transfers.
              </p>
              <h2>11. Children</h2>
              <p>
                Our programs are intended for learners aged 18 and above, or for younger learners with a parent or guardian's consent. If you believe a child has given us information without that consent, contact us and we will remove it.
              </p>
              <h2>12. Changes to this policy</h2>
              <p>
                We may update this policy as the site or the law changes. The "last updated" date above shows when it last changed, and we will highlight significant changes on the site.
              </p>
              <h2>13. Contact and grievances</h2>
              <p>
                Privacy questions and grievances: [Grievance Officer name],{" "}
                <a href="mailto:hr@aadyosh.com">hr@aadyosh.com</a>
                , Aadyosh Corporate Private Limited, Anand Nagar, Nagpur. See also our{" "}
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
                .
              </p>
            </article>
          </div>
        </section>
    </div>
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatWidget } from "@/components/ChatWidget";
import { PageEffects } from "@/components/PageEffects";
import { BatchProvider } from "@/components/BatchContext";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { computeNextBatch } from "@/lib/batch";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "aadyosh — Career-Focused, Mentor-Led Learning", template: "%s — aadyosh" },
  description: "aadyosh helps ambitious learners build real skills through live cohorts, hands-on projects, internships, and placement support.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/* The page shell is re-rendered at most once an hour so the server-rendered "next batch" never goes far out of date
   (the browser corrects it immediately anyway - see BatchProvider). */
export const revalidate = 3600;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initial = computeNextBatch(new Date(), { BATCH_DAY: process.env.BATCH_DAY, BATCH_DATE: process.env.BATCH_DATE });
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>
        <BatchProvider initialIso={initial.start}>
          <AuthProvider>
            <ModalProvider>
              <SiteHeader />
              {children}
              <SiteFooter />
              <ChatWidget />
              <PageEffects />
            </ModalProvider>
          </AuthProvider>
        </BatchProvider>
      </body>
    </html>
  );
}

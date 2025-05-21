import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 wrapper flex flex-col overflow-hidden">
          <div className="content-wrapper flex flex-col flex-1 overflow-hidden">
            <Suspense>{children}</Suspense>
          </div>
        </main>
         <Toaster />
        <Footer />
      </div>
    </>
  );
}

import "@/app/globals.css";
import React, { Suspense } from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Spinner from "@/components/Spinner";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-main-background text-primary-text">
        <ReduxProvider>
          <ReactQueryProvider>
            <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-12 md:px-10">
              <Suspense
                fallback={
                  <Spinner size="lg" fullPage text="Loading..." />
                }
              >
                {children}
              </Suspense>
            </main>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

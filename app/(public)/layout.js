import "@/app/globals.css";
import React, { Suspense } from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="flex h-screen overflow-hidden bg-main-background text-primary-text">
        <ReduxProvider>
          <ReactQueryProvider>
            <Sidebar />
            <div className="flex flex-1 flex-col h-screen overflow-y-auto overflow-x-hidden">
              <Header />
              <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
                <Suspense
                  fallback={
                    <Spinner
                      size="xl"
                      fullPage
                      text="Loading MovieNoah..."
                    />
                  }
                >
                  {children}
                </Suspense>
              </main>
            </div>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvidrer from "@/providers/ReduxProvidrer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="grid grid-cols-[20rem_1fr]">
        <ReduxProvidrer>
          <ReactQueryProvider>
            <Sidebar />
            <main className="h-screen overflow-y-auto bg-main-background px-14 py-12">
              {children}
            </main>
          </ReactQueryProvider>
        </ReduxProvidrer>
      </body>
    </html>
  );
}

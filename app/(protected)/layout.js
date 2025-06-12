import "@/app/globals.css";
// import Sidebar from "@/components/Sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="grid">
        <ReduxProvider>
          <ReactQueryProvider>
            <main className="h-screen overflow-y-auto bg-main-background px-14 py-12">
              {children}
            </main>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

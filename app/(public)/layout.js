import "@/app/globals.css";
// import Sidebar from "@/components/Sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="flex h-screen overflow-hidden text-primary-text">
        <ReduxProvider>
          <ReactQueryProvider>
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto bg-main-background px-14 py-12">
              {children}
            </main>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

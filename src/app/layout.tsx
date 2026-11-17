import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { ExpenseModalProvider } from "@/context/ExpenseModalContext";
import { ToastProvider } from "@/context/ToastContext";
import { SettingsProvider } from "@/context/SettingsContext";

export const metadata = {
  title: "Home Finance",
  description: "Gestão de despesas domésticas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <html lang="pt-BR">
        <body className="font-sans antialiased">
          <AuthProvider>
            <SettingsProvider>
              <ToastProvider>
                <ExpenseModalProvider>{children}</ExpenseModalProvider>
              </ToastProvider>
            </SettingsProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}

import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { ExpenseModalProvider } from "@/context/ExpenseModalContext";
import { ToastProvider } from "@/context/ToastContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Home Finance",
  description: "Gestão de despesas domésticas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <html lang="pt-BR">
        <body className="font-sans antialiased">
          <ThemeProvider>
            <AuthProvider>
              <SettingsProvider>
                <ToastProvider>
                  <ExpenseModalProvider>{children}</ExpenseModalProvider>
                </ToastProvider>
              </SettingsProvider>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

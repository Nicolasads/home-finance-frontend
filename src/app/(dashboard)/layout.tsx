import { ExpenseFormModal } from "@/components/expenses/ExpenseFormModal";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { ExpenseModalProvider } from "@/context/ExpenseModalContext";
import { ExpensesProvider } from "@/context/ExpensesContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC = ({ children }: PropsWithChildren) => {
  return (
    <ExpensesProvider>
      <CategoriesProvider>
        <SettingsProvider>
          <ExpenseModalProvider>
            <DashboardShell>{children}</DashboardShell>
            <ExpenseFormModal />
          </ExpenseModalProvider>
        </SettingsProvider>
      </CategoriesProvider>
    </ExpensesProvider>
  );
};

export default DashboardLayout;

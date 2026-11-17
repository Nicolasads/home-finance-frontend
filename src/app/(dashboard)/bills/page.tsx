import { Suspense } from "react";
import { BillsView } from "@/components/bills/BillsView";

export const metadata = { title: "Contas a Pagar | Home Finance" };

export default function BillsPage() {
  return (
    <Suspense fallback={null}>
      <BillsView />
    </Suspense>
  );
}

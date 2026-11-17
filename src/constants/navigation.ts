import {
  BarChart3,
  DollarSign,
  Home,
  LucideIcon,
  Settings,
  Tag,
} from "lucide-react";
import { ROUTES } from "./routes";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  title: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = Object.freeze([
  {
    label: "Visão Geral",
    href: ROUTES.HOME,
    icon: Home,
    title: "Dashboard Financeiro",
  },
  {
    label: "Contas a Pagar",
    href: ROUTES.BILLS,
    icon: DollarSign,
    title: "Gerenciamento de Contas",
  },
  {
    label: "Categorias",
    href: ROUTES.CATEGORIES,
    icon: Tag,
    title: "Categorias de Despesas",
  },
  {
    label: "Relatórios",
    href: ROUTES.REPORTS,
    icon: BarChart3,
    title: "Relatórios e Análises",
  },
  {
    label: "Configurações",
    href: ROUTES.SETTINGS,
    icon: Settings,
    title: "Configurações do Sistema",
  },
]);

const DEFAULT_PAGE_TITLE = "Home Finance";

export const getPageTitle = (pathname: string): string =>
  NAVIGATION_ITEMS.find((item) => item.href === pathname)?.title ??
  DEFAULT_PAGE_TITLE;

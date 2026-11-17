"use client";

import { useEffect } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AUTH_TABS, type AuthTab } from "@/constants/auth";

const FORMS: Record<AuthTab, () => React.ReactNode> = {
  [AUTH_TABS.LOGIN]: () => <LoginForm />,
  [AUTH_TABS.REGISTER]: () => <RegisterForm />,
};

export default function LoginPage() {
  useEffect(() => {
    document.title = "Entrar | Home Finance";
  }, []);

  return <AuthLayout renderForm={(tab) => FORMS[tab]()} />;
}

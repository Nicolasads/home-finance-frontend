import { Sparkles, TrendingUp, Wallet } from "lucide-react";

const APP_NAME = "Home Finance";

export function BrandPanel() {
  return (
    <aside className="relative hidden flex-1 flex-col justify-between overflow-hidden border-r border-indigo-900/40 bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 p-12 text-white lg:flex">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-500 to-violet-500 shadow-xl shadow-indigo-500/30">
          <Wallet className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xl font-bold tracking-tight">{APP_NAME}</p>
          <p className="text-xs font-medium text-indigo-300">
            Plataforma de gestão doméstica
          </p>
        </div>
      </div>

      <div className="relative z-10 my-auto max-w-lg space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-400" />
          Controle financeiro da casa
        </span>

        <h2 className="text-4xl font-black leading-tight tracking-tight xl:text-5xl">
          Controle total das finanças da sua casa em um só lugar.
        </h2>

        <p className="text-sm leading-relaxed text-indigo-200/80">
          Acompanhe contas a pagar, visualize gráficos e previna surpresas no
          seu orçamento familiar.
        </p>

        <div className="space-y-4 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-xs text-indigo-200">
              Visão do mês, em tempo real
            </p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-linear-to-r from-emerald-400 to-indigo-400" />
          </div>
        </div>
      </div>

      <footer className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-indigo-300/70">
        <p>© 2026 {APP_NAME}. Todos os direitos reservados.</p>
        <nav className="flex items-center gap-4">
          <a href="#" className="transition hover:text-white">
            Privacidade
          </a>
          <span>•</span>
          <a href="#" className="transition hover:text-white">
            Termos
          </a>
        </nav>
      </footer>
    </aside>
  );
}

# Home Finance: Front-end

Interface web do **Home Finance**, um sistema de gestão financeira doméstica. Permite cadastrar contas a pagar, acompanhar o status de cada uma, organizar gastos por categoria com orçamento e visualizar relatórios do mês.

O front-end consome a API REST do projeto `home-finance-backend` e não guarda regra de negócio: cálculos de totais, status e comparações ficam em funções puras, testáveis sem React.

---

## Sumário

- [Stack](#stack)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Arquitetura](#arquitetura)
- [Rotas e proteção](#rotas-e-proteção)
- [Estado global (providers)](#estado-global-providers)
- [Camada de serviços e HTTP](#camada-de-serviços-e-http)
- [Regras de negócio no front](#regras-de-negócio-no-front)
- [Tema claro e escuro](#tema-claro-e-escuro)
- [Convenções de código](#convenções-de-código)
- [Autenticação](#autenticação)
- [Pendências conhecidas](#pendências-conhecidas)
- [Solução de problemas](#solução-de-problemas)

---

## Stack

| Tecnologia                 | Uso                                                    |
| -------------------------- | ------------------------------------------------------ |
| **Next.js** (App Router)   | Rotas, layouts e renderização                          |
| **React** e **TypeScript** | Interface e tipagem                                    |
| **Tailwind CSS**           | Estilo, com suporte a tema escuro por classe (`dark:`) |
| **lucide-react**           | Ícones                                                 |
| **Recharts**               | Gráficos do dashboard e de relatórios                  |

---

## Funcionalidades

- **Login e cadastro** com e-mail e senha, e login social (Google, Apple e GitHub) via redirecionamento para a API.
- **Visão geral (dashboard)**: total do mês, comparação com o mês anterior, contas pagas, pendentes e vencidas, evolução dos últimos meses, gastos por categoria e próximas contas a vencer.
- **Contas a pagar**: listagem do mês selecionado, busca por nome, filtros por status e categoria, marcar como paga, editar e excluir.
- **Cadastro e edição de despesas** por um modal único, com categorias carregadas da API.
- **Categorias**: orçamento de cada categoria e gasto do mês, com alerta visual quando o uso passa de 90%.
- **Relatórios**: indicadores, gráficos de evolução e recorrência, comparação entre meses e detalhamento por categoria com painel de lançamentos.
- **Configurações**: notificações por e-mail e modo escuro.
- **Seletor de período** no cabeçalho, que altera os dados de todas as telas.

---

## Pré-requisitos

- Node.js 18.18 ou superior
- Yarn ou npm
- O backend `home-finance-backend` rodando (por padrão em `http://localhost:3333`)

---

## Instalação e execução

```bash
# 1. Instale as dependências
yarn install

# 2. Crie o arquivo de ambiente
cp .env.example .env.local

# 3. Suba o servidor de desenvolvimento
yarn dev
```

A aplicação fica disponível em `http://localhost:3000`. Sem sessão, o acesso a qualquer página redireciona para `/login`.

Para validar tipos sem gerar build:

```bash
yarn typecheck
```

---

## Variáveis de ambiente

Crie `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3333/api
```

| Variável              | Descrição                                                                 |
| --------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API, incluindo o prefixo `/api`. Usada por todos os serviços. |

Variáveis com o prefixo `NEXT_PUBLIC_` são embutidas no código do navegador. Não coloque segredos nelas.

Depois de alterar o `.env.local`, reinicie o `yarn dev`.

---

## Scripts

| Comando          | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `yarn dev`       | Servidor de desenvolvimento com hot reload |
| `yarn build`     | Gera o build de produção                   |
| `yarn start`     | Sobe o build gerado                        |
| `yarn typecheck` | Verifica tipos com `tsc --noEmit`          |
| `yarn lint`      | Executa o linter do Next.js                |

---

## Estrutura de pastas

```
home-finance-frontend/
├── public/
├── src/
│   ├── app/                              # ROTAS (App Router)
│   │   ├── layout.tsx                    # Layout raiz: <html>, fontes e estilos globais
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── (auth)/
│   │   │   └── login/page.tsx            # Tela de login e cadastro
│   │   └── (dashboard)/                  # Área protegida pelo middleware
│   │       ├── layout.tsx                # Providers + shell da área logada
│   │       ├── page.tsx                  # Visão geral (/)
│   │       ├── bills/page.tsx            # Contas a pagar (/bills)
│   │       ├── categories/page.tsx       # Categorias (/categories)
│   │       ├── reports/page.tsx          # Relatórios (/reports)
│   │       └── settings/page.tsx         # Configurações (/settings)
│   │
│   ├── components/                       # Interface. Não busca dados.
│   │   ├── ui/                           # Componentes reutilizáveis (Button, FormField, Modal...)
│   │   ├── layout/                       # DashboardShell, Sidebar, Header, NotificationsMenu
│   │   ├── auth/                         # AuthLayout, LoginForm, RegisterForm, BrandPanel...
│   │   ├── dashboard/                    # DashboardOverview, KpiCard, MonthlyBarChart...
│   │   ├── bills/                        # BillsView, BillsTable, BillFilters
│   │   ├── categories/                   # CategoriesView, CategoryCard
│   │   ├── expenses/                     # ExpenseFormModal, ExpenseForm
│   │   ├── reports/                      # ReportsView e seus gráficos e tabelas
│   │   └── settings/                     # SettingsView, SettingsToggle
│   │
│   ├── context/                          # Estado global (providers)
│   │   ├── AuthContext.tsx
│   │   ├── ExpensesContext.tsx
│   │   ├── CategoriesContext.tsx
│   │   ├── SettingsContext.tsx
│   │   ├── ExpenseModalContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── hooks/                            # Ponte entre telas e estado/cálculos
│   │   ├── useAuth.ts
│   │   ├── useExpenses.ts
│   │   ├── useCategories.ts
│   │   ├── useSettings.ts
│   │   ├── useExpenseModal.ts
│   │   ├── useExpenseForm.ts
│   │   ├── useToast.ts
│   │   ├── useTheme.ts
│   │   ├── useChartTheme.ts
│   │   ├── useDashboardData.ts
│   │   ├── useBillFilters.ts
│   │   ├── useCategorySummaries.ts
│   │   ├── useReportAnalytics.ts
│   │   └── useNotifications.ts
│   │
│   ├── services/                         # Chamadas HTTP à API
│   │   ├── httpClient.ts
│   │   ├── authService.ts
│   │   ├── expenseService.ts
│   │   ├── categoryService.ts
│   │   └── settingsService.ts
│   │
│   ├── utils/                            # Funções puras, sem React
│   │   ├── classNames.ts                 # cn()
│   │   ├── formatters.ts                 # moeda, datas, mês
│   │   ├── expenseCalculations.ts        # totais, status, histórico
│   │   ├── expenseFormMappers.ts         # formulário <-> payload da API
│   │   ├── expenseValidation.ts
│   │   ├── categorySummary.ts
│   │   ├── reportAnalytics.ts
│   │   ├── periodOptions.ts
│   │   ├── validators.ts
│   │   ├── passwordStrength.ts
│   │   └── themeStorage.ts
│   │
│   ├── constants/                        # Valores fixos e configuração
│   │   ├── routes.ts
│   │   ├── navigation.ts
│   │   ├── expenseStatus.ts
│   │   ├── expenseForm.ts
│   │   ├── categories.ts                 # COLOR_CLASSES e ICON_MAP
│   │   ├── budget.ts
│   │   ├── auth.ts
│   │   ├── settings.ts
│   │   ├── reports.ts
│   │   ├── notifications.ts
│   │   └── theme.ts
│   │
│   ├── types/                            # Tipos compartilhados
│   │
│   └── middleware.ts                     # Proteção de rotas por cookie
│
├── .env.example
├── .env.local                            # Não versionar
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## Arquitetura

O projeto segue camadas com dependência em um sentido só:

```
app (rotas) → components (telas e UI) → hooks → context → services → HTTP
                                          ↓
                                   utils / constants (funções puras)
```

| Camada        | Responsabilidade                                       | Não deve                                 |
| ------------- | ------------------------------------------------------ | ---------------------------------------- |
| `app/`        | Declarar a rota e renderizar **um** componente de tela | Conter lógica ou buscar dados            |
| `components/` | Montar a interface a partir de props e hooks           | Chamar `fetch` ou `services` diretamente |
| `hooks/`      | Ler o contexto, combinar dados e expor ações           | Renderizar JSX                           |
| `context/`    | Guardar estado global e carregar dados da API          | Conter cálculos de tela                  |
| `services/`   | Falar com a API e normalizar a resposta                | Conhecer componentes                     |
| `utils/`      | Cálculos, formatação e validação puros                 | Importar React                           |
| `constants/`  | Valores fixos, opções e mapas                          | Ter lógica                               |

Na prática:

- A **tela** (`BillsView`, `CategoriesView`, `ReportsView`) liga hooks a componentes de apresentação.
- Os **componentes de apresentação** recebem dados por props e não sabem de onde vieram.
- Os **hooks** são a única forma de a tela acessar o estado: componentes não usam `useContext` direto.

---

## Rotas e proteção

| Rota          | Arquivo                               | Acesso      |
| ------------- | ------------------------------------- | ----------- |
| `/login`      | `app/(auth)/login/page.tsx`           | Público     |
| `/`           | `app/(dashboard)/page.tsx`            | Autenticado |
| `/bills`      | `app/(dashboard)/bills/page.tsx`      | Autenticado |
| `/categories` | `app/(dashboard)/categories/page.tsx` | Autenticado |
| `/reports`    | `app/(dashboard)/reports/page.tsx`    | Autenticado |
| `/settings`   | `app/(dashboard)/settings/page.tsx`   | Autenticado |

Os grupos entre parênteses (`(auth)` e `(dashboard)`) organizam o código sem aparecer na URL.

O **middleware** (`src/middleware.ts`) verifica a presença do cookie `hf_session`:

- sem cookie, qualquer rota diferente de `/login` redireciona para `/login`;
- com cookie, acessar `/login` redireciona para `/`.
  O middleware é só uma proteção de navegação. Quem valida a sessão de verdade é a API, em cada requisição.

---

## Estado global (providers)

Os providers ficam em `app/layout.tsx` (globais) e em `app/(dashboard)/layout.tsx` (área logada):

| Provider               | Onde fica   | Responsabilidade                                                               |
| ---------------------- | ----------- | ------------------------------------------------------------------------------ |
| `AuthProvider`         | Raiz        | Usuário logado, login, cadastro, login social e logout                         |
| `ToastProvider`        | Raiz        | Mensagens temporárias (`showToast`)                                            |
| `ExpensesProvider`     | Área logada | Lista de despesas, mês selecionado e ações (salvar, remover, marcar como paga) |
| `CategoriesProvider`   | Área logada | Categorias vindas da API                                                       |
| `SettingsProvider`     | Área logada | Configurações do usuário                                                       |
| `ExpenseModalProvider` | Área logada | Abertura e fechamento do modal de despesa                                      |

O `ExpenseFormModal` é renderizado uma vez, no layout da área logada, e é aberto por qualquer botão que chame `openCreateModal` ou `openEditModal`.

Os dados são carregados uma vez, na montagem do provider. Depois de criar, editar ou pagar uma despesa, o provider atualiza a lista local com o retorno da API, e todas as telas se atualizam sem recarregar a página.

---

## Camada de serviços e HTTP

Todas as chamadas passam por `services/httpClient.ts`:

```ts
request<T>(path, { method, body });
```

Características:

- `credentials: 'include'`: envia o cookie `hf_session` em toda requisição.
- `Content-Type: application/json` em todas as requisições.
- Respostas não ok lançam `ApiError` com o status HTTP.
- Resposta `204` retorna `null`.
  Os serviços expõem apenas os métodos de cada recurso:

| Serviço           | Métodos                                                    |
| ----------------- | ---------------------------------------------------------- |
| `authService`     | `login`, `register`, `logout`, `getSession`, `getOAuthUrl` |
| `expenseService`  | `list`, `create`, `update`, `remove`                       |
| `categoryService` | `list`                                                     |
| `settingsService` | `get`, `update`                                            |

`expenseService` normaliza a resposta da API antes de devolvê-la ao resto do app:

- `value` chega como string (o `Decimal` do Prisma) e vira `number`;
- `dueDate` e `paymentDate` chegam com horário e viram `YYYY-MM-DD`.
  Assim, o restante do código sempre trabalha com números e datas no formato esperado.

---

## Regras de negócio no front

### Status

O banco guarda apenas `PAID` e `PENDING`. O status **Vencido** é calculado na leitura:

```ts
getEffectiveStatus(expense, today);
// Pendente com dueDate anterior a hoje => Vencido
```

Por isso o select de status do formulário não oferece "Vencido": esse valor nunca é enviado.

### Totais e comparações

`utils/expenseCalculations.ts` concentra as somas e as comparações:

- `filterByMonth(expenses, "YYYY-MM")` filtra pelo mês de vencimento.
- `calculateMonthlyStats` devolve total, variação e totais por status.
- `buildMonthlyHistory` devolve os últimos meses, com zero para meses vazios.
- `getTotalsByCategory` agrupa por categoria, a partir da lista vinda da API.

### Categorias

As categorias vêm da API e são identificadas pelo `id`. Os nomes não são usados como chave, porque as categorias podem ser personalizadas.

Cores e ícones chegam como `colorKey` e `iconKey`. `constants/categories.ts` converte essas chaves em classes Tailwind (`COLOR_CLASSES`) e componentes de ícone (`ICON_MAP`). Se a chave não existir no mapa, a interface usa um valor padrão, sem quebrar.

Classes Tailwind precisam aparecer escritas por extenso no código. Não monte nomes de classe com interpolação (`` `bg-${color}-500` ``), porque o Tailwind não as gera.

### Formulário de despesa

- `formValuesToExpenseInput` converte o texto digitado no payload da API. Aceita vírgula decimal (`65,90`).
- A data de pagamento é definida no cliente, no momento em que a conta é marcada como paga.
- Ao editar, o `id` da despesa é passado para `saveExpense(data, id)`, que chama `update`. Sem `id`, chama `create`.

---

## Tema claro e escuro

- O tema é controlado por `useTheme`, que adiciona ou remove a classe `dark` no `<html>`.
- A preferência é salva em `localStorage` (chave `hf_theme`), com `try/catch` para navegadores que bloqueiam o armazenamento.
- O `ThemeToggle` é o único componente de troca de tema. Ele fica no cabeçalho e na tela de login.
- Gráficos do Recharts não entendem classes Tailwind. `useChartTheme` fornece as cores de eixo, grade e tooltip conforme o tema atual.
  Ao criar um componente novo, sempre defina a variante escura junto da clara (`bg-white dark:bg-slate-900`). Evite cor de texto fixa sem variante escura.

---

## Convenções de código

- **Nomes que revelam intenção**: `calculateMonthlyStats`, `useDashboardData`, `getEffectiveStatus`.
- **Uma responsabilidade por arquivo**. Componente de tela não tem cálculo; hook não tem JSX.
- **Sem valores soltos no código**: status, rotas, orçamentos e mensagens ficam em `constants/`.
- **Imports por alias**: `@/` aponta para `src/`.
- **Props tipadas**: cada componente declara sua interface, no lugar de `any`.
- **Acessibilidade**: botões só com ícone têm `aria-label`; mensagens de erro usam `role="alert"`; campos inválidos marcam `aria-invalid`.
- **Exports nomeados** nos componentes (`export function ...`), não `default`, exceto nas páginas do App Router.

---

## Autenticação

O login gera um cookie `httpOnly` no domínio da API, então o JavaScript do navegador não consegue lê-lo. O front não guarda token em `localStorage`.

Fluxo:

1. `LoginForm` ou `RegisterForm` chama `authService`.
2. A API responde e grava o cookie `hf_session`.
3. O `AuthProvider` guarda o usuário e o `LoginForm` redireciona para `/`.
4. Nas próximas requisições, o navegador envia o cookie automaticamente, porque `credentials: 'include'` está ativo.
   Login social: `loginWithProvider(provider)` redireciona o navegador para `/auth/oauth/:provider` da API, com `returnTo` apontando para a página atual. A API faz o fluxo com o provedor e devolve o usuário para o front.

---

## Pendências conhecidas

- **Rotas de OAuth** (`/auth/oauth/:provider` e o callback) ainda precisam ser concluídas no backend.
- **Spinner no botão**: o `Button` mostra "Aguarde..." durante o envio. A troca pelo ícone animado está pendente.
- **Exportação de relatório**: o botão de CSV ainda exibe um aviso. `buildExpensesCsv` existe, mas não está ligado ao botão.
- **Selects de mês nos relatórios**: as opções de mês base e comparação precisam ser geradas por `buildPeriodOptions()`.
- **Categorias padrão**: as categorias padrão são globais no backend. A tela de categorias ainda não permite editar orçamentos.
- **Testes**: não há testes automatizados no front. As funções em `utils/` são as primeiras candidatas.

---

## Solução de problemas

**`GET /api/categories` ou `/api/expenses` retorna 401**

- Confirme que o cookie `hf_session` aparece na aba Application do DevTools, em `localhost:3333`.
- Confirme que o `httpClient` usa `credentials: 'include'` e que o `CLIENT_URL` do backend é `http://localhost:3000`.
  **Página de dashboard em branco ou com erro de hidratação**
- O dashboard depende de `new Date()` no estado inicial. Os providers só montam os dados no cliente, por isso o `useIsClient` existe. Não mova a leitura de data para o corpo do componente de servidor.
  **Select de categoria vazio no modal de despesa**
- Confirme que a resposta de `GET /api/categories` tem itens. O usuário precisa ter categorias padrão ou próprias no backend.
  **Ícone de categoria invisível no tema claro**
- Verifique se a classe de cor do ícone tem variante clara com contraste suficiente (`text-*-600`, não `-400`).
  **Alterações em `.env.local` sem efeito**
- Reinicie o `yarn dev`. Variáveis `NEXT_PUBLIC_*` são lidas só na inicialização.

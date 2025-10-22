# DIÁRIO DE APRENDIZAGEM

---

## Aula 01 - Boas-vindas - 20/10/2025

Boas-vindas + informações sobre o curso

---

---

## Aula 02 - O que é SPA e o que é Angular - 20/10/2025

**SPA (Single Page Application)**:

- A navegação acontece **no cliente**: o browser carrega um HTML inicial e o JavaScript atualiza a UI sem recarregar a página inteira.
- Vantagens: fluidez, experiência próxima a app nativa, menor tráfego após o primeiro load.
- Desvantagens: SEO mais difícil; atenção a performance e acessibilidade.

**Angular**:

- _Framework_ completo para construir SPAs robustas.
- Inclui: _components_, _modules_, _dependency injection_, _routing_, _forms_, _http client_, _testing_, _i18n_.
- Usa **TypeScript** (tipagem estática + recursos ESNext).

**Quando usar Angular**:

- Projetos grandes, equipes médias/grandes, necessidade de padrões e escalabilidade.
- Ecossistema consistente (CLI, estruturas padronizadas, tooling).

---

---

## Aula 03 - Documentação Angular - 20/10/2025

- **Site oficial**: [https://angular.dev](https://angular.dev) (Guides, Tutorials, API).
- **Como ler a doc**:
  - Comece por _Guides_ e _Tutorials_; depois aprofunde em _API Reference_.
  - Procure exemplos práticos e diferenças entre versões.
- **Dica**: salve trechos no seu _snippet manager_ e referencie no código.

---

---

## Aula 04 - Setup de um projeto - 20/10/2025

**Pré-requisitos**
Verifique Node.js (LTS recomendado) e npm:

```bash
node -v
npm -v
```

**Instalar Angular CLI**
Opção 1 (mais recente):

```bash
npm i -g @angular/cli
ng version
```

Opção 2 (versão específica):

```bash
npm i -g @angular/cli@20.3.6
ng version
```

**Criar projeto**
(respostas equivalentes às escolhas feitas no prompt)

```bash
ng new <nome-do-app>
# stylesheet format: SCSS
# Server-Side Rendering (SSR): N
# zoneless: N
# AI tools: None
```

> **Stylesheet Format: Sass (SCSS)**
>
> - O que é: pré-processador de CSS com variáveis, mixins, aninhamento etc.
> - Por que escolher: estilos mais organizados e reutilizáveis.
> - Alternativas: CSS, Sass (indented), Less (dependendo do preset).
> - Impacto: o projeto nasce com arquivos `.scss` e build já configurado.

.

> **SSR/SSG: No**
>
> - O que é: SSR renderiza HTML no servidor (melhora SEO/TTFB); SSG gera HTML estático no build.
> - Por que “No”: simplifica o começo (menos camadas/deploys).
> - Quando “Yes”: apps públicas com SEO/preview/primeiro carregamento crítico.
> - Como ligar depois: `ng add @angular/ssr` (cria setup para SSR/Prerender).

.

> **Zoneless (sem zone.js): No**
>
> - O que é: remove zone.js e usa detecção de mudanças orientada por **Signals**.
> - Por que “No”: caminho tradicional; muitos exemplos/libs assumem zone.js.
> - Quando “Yes”: foco em performance/controle fino de change detection.
> - Observação: zoneless exige padrões mais explícitos para atualizar a UI.

.

> **AI Tools: None**
>
> - O que é: a CLI pode pré-configurar integrações (prompts, regras, snippets).
> - Por que “None”: evita ruído no começo; pode adicionar depois.
> - Se escolher outra: a CLI cria arquivos/configs de boas práticas da ferramenta.

**Rodando o projeto**
A opção **`-o`** (`--open`) abre o navegador automaticamente em `http://localhost:4200` ao terminar a compilação.  
Sem **`-o`**, abra manualmente: `http://localhost:4200`.

```bash
cd <nome-do-app>
ng serve -o
```

---

---

## Aula 05 - Anatomia de uma App Angular - 20/10/2025

**Visão geral**
(standalone por padrão)

- Projeto **sem NgModule**: o bootstrap acontece em `main.ts` com `bootstrapApplication(AppComponent, appConfig)`.
- Configurações globais em `src/app/app.config.ts` (providers como Router, HttpClient, animações etc.).
- Rotas em `src/app/app.routes.ts` (suporta lazy loading).
- Componente raiz em `src/app/app.ts` (standalone: true), com template `app.html` e estilos `app.scss`.
- HTML base em `src/index.html`; estilos globais em `src/styles.scss`.
- `public/` (na raiz) para arquivos estáticos copiados para o build.
- `favicon.ico` na raiz do projeto (fora de `src/`).
- Arquivos de configuração na raiz: `angular.json`, `tsconfig*.json`, `package.json`, `.editorconfig`, `.gitignore`, `README.md`.

**Árvore real do seu projeto**
(No estágio inicial)

```text
nome-do-projeto
├─ .vscode/                    # configs do VS Code do workspace
├─ node_modules/               # dependências (gerenciado pelo npm)
├─ public/                     # arquivos estáticos copiados "as is" no build
│  └─ ...                      # (imagens, ícones extras, manifest, etc.)
├─ favicon.ico                 # ícone raiz (fora de src/)
├─ src/
│  ├─ app/
│  │  ├─ app.config.ts         # providers globais (Router, HttpClient, animações…)
│  │  ├─ app.routes.ts         # rotas (suporta lazy loading, guards, resolvers)
│  │  ├─ app.ts                # AppComponent (standalone: true)
│  │  ├─ app.html              # template do AppComponent
│  │  ├─ app.scss              # estilos do AppComponent
│  │  └─ app.spec.ts           # testes do AppComponent
│  ├─ index.html               # HTML base (ponto de injeção)
│  ├─ main.ts                  # bootstrapApplication(AppComponent, appConfig)
│  └─ styles.scss              # estilos globais da app
├─ .editorconfig               # padronização de editor (indentação, EOL, charset)
├─ .gitignore                  # arquivos/pastas ignorados pelo Git
├─ angular.json                # config do Angular CLI (build/serve/test)
├─ package.json                # scripts e dependências
├─ package-lock.json           # lockfile do npm
├─ README.md                   # documentação do projeto
├─ tsconfig.json               # tsconfig base
├─ tsconfig.app.json           # tsconfig da aplicação
└─ tsconfig.spec.json          # tsconfig dos testes
```

**Conceitos-chave no Angular 20**
(que impactam a anatomia)

- **Control Flow moderno**: preferir a nova sintaxe `@if`, `@for`, `@switch`. As diretivas antigas `*ngIf`, `*ngFor`, `*ngSwitch` estão **deprecadas**.
- **Signals estáveis**: APIs como `signal`, `computed`, `effect` e utilitários (`toSignal` etc.).
- **Zoneless (opcional)**: iniciar sem Zone.js com `provideZonelessChangeDetection()` em providers.
- **SSR/hidratação**: _incremental hydration_ disponível; habilitar quando usar SSR (ex.: `provideClientHydration(...)`).
- **Requisitos**: Node **>= 20.11.1** (ou >= 22.11) e TypeScript **5.8.x**.

**Boas práticas neste layout**
(E também em outros)

- **Componentes enxutos** + **services** para lógica/IO; componentes focados em UI.
- **Lazy loading** por feature; manter `app.routes.ts` organizado por áreas.
- **Providers centralizados** em `app.config.ts`: `provideRouter`, `provideHttpClient`, `provideAnimations` etc.
- **Migrar templates** para o **control flow novo** (`@if/@for/@switch`) conforme o projeto evoluir.
- **Padrão de nomes** consistente (`feature-name.component.ts`, `feature-name.routes.ts` etc.) e adoção de `core/`, `shared/`, `features/`.

---

---

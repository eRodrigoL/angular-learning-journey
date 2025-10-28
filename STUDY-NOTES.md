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

## Aula 06 - Extensões VS Code úteis - 20/10/2025

Instale e configure as extensões abaixo para acelerar o fluxo:

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) — _Autocomplete_ e diagnósticos para templates.
- [Angular Snippets (Version 18) — John Papa](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) — atalhos para gerar estruturas Angular.
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) — renomeia automaticamente tags HTML pareadas.
- [Angular 17 Snippets — BeastCode](https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode) — snippets para TS/HTML/Material/NgRx/RxJS/Flex Layout.

### Comandos rápidos (cola de bolso)

```bash
# criar projeto
ng new <nome-do-app> --routing --style=scss
```

```bash
# rodar local
ng serve -o
```

```bash
# gerar artefatos
ng g application admin               # application
ng g component shared/header         # component
ng g class models/user               # class
ng g directive shared/auto-focus     # directive
ng g enum models/user-role           # enum
ng g guard auth/auth                 # guard
ng g interceptor core/http/auth      # interceptor
ng g interface models/user           # interface
ng g library ui-kit                  # library
ng g module shared/shared            # module (ainda útil p/ libs e agrupamentos, mesmo com standalone)
ng g pipe shared/currency-br         # pipe
ng g resolver users/user             # resolver
ng g service core/http/api           # service

# O caminho define pastas.
# O último segmento vira o nome base dos arquivos
```

```bash
# checar versões
ng version
node -v
npm -v
```

---

### Execuções realizadas

- Conferida a versão do Angular CLI instalado com `ng version`:

  ```txt
  Angular CLI: 20.3.6
  Node: 22.14.0
  Package Manager: npm 10.9.2
  OS: win32 x64
  ```

- Criado projeto com `ng new <nome-do-app>` (ajuste o nome conforme o caso)

- Ambiente validado: aplicação iniciada com `ng serve -o`.

---

---

## Aula 07 — O que são **Componentes** no Angular

> **Definição**: componente é a **unidade básica de UI** no Angular.
> Junta **lógica** (classe TypeScript), **template** (HTML), **estilos** (CSS/SCSS) e **metadados** (decorator @Component).
> No Angular moderno (v20), componentes são **standalone por padrão** e se conectam via **Inputs/Outputs**, **rotas** e **serviços**.

Ou seja: **Componente = unidade de UI** com TS + HTML + estilos (e, opcionalmente, testes).

---

### Como gerar um componente?

O **Angular CLI** gera os artefatos do projeto. Para componentes:

```bash
ng generate component <nome>
```

Comando reduzido:

```bash
ng g c <nome>
```

> **Importante**: `<nome>` na verdade representa um **caminho**, onde barras "`/`" separam pasta e subpastas. O **último segmento** define **(a)** a **pasta final** criada, **(b)** o **seletor** (prefixado, ex.: `app-`), e **(c)** o **nome da classe** em **PascalCase**.  
> Ex.: `components/nome-do-componente` → classe `NomeDoComponente`, seletor `app-nome-do-componente`.

#### O que é gerado

Comando:

```bash
ng g c components/nome-desejado
```

Estrutura criada (padrão v20):

```txt
src/
└─ app/
   └─ components/
      └─ nome-desejado/
         ├─ nome-desejado.html       ⭠ template do componente (markup)
         ├─ nome-desejado.scss       ⭠ estilos do componente (pode ser .css/.scss/ .sass)
         ├─ nome-desejado.spec.ts    ⭠ testes unitários do componente
         └─ nome-desejado.ts         ⭠ classe + metadados (@Component) do componente
```

Arquivo principal: classe + metadados (@Component) do componente:

```ts
// src/app/components/nome-desejado/nome-desejado.ts
import { Component } from "@angular/core";

@Component({
  //     seletor 👇🏻 = prefixo (p.ex. "app-") + último segmento do caminho
  selector: "app-nome-desejado",
  imports: [], // dependências que o template usa (diretivas, pipes, outros componentes)
  templateUrl: "./nome-desejado.html",
  styleUrl: "./nome-desejado.scss", // v20 costuma gerar "styleUrl" (singular)
})
export class NomeDesejado {}
// nome da classe 👆🏻 = último segmento em PascalCase, sem hífens
```

**Opções úteis (podem ser combinadas):**

- `--style=scss` → cria arquivo de estilo em SCSS
- `--skip-tests` → não cria o arquivo de testes `.spec.ts`
- `--selector=app-meu-card` → define um seletor específico
- `--inline-template` / `--inline-style` → usa `template`/`styles` em linha
- `--flat` → coloca os arquivos no diretório alvo **sem** criar uma pasta própria
- `--prefix=app` → altera o prefixo do seletor para este componente

> **Dica**: em apps standalone, tudo que o template usa deve aparecer em `imports` (ex.: `RouterOutlet`, componentes filhos, diretivas/pipes).

---

### Usando o componente

Para **declarar** o componente do exemplo abaixo

```ts
// src/app/components/componente-desejado/componente-desejado.ts
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-omponente-desejado",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./omponente-desejado.html",
  styleUrl: "./omponente-desejado.scss",
})
export class ComponenteDesejado {}
```

Primeiro importe-o na classe do componente pai (ex: `app.ts`):

```ts
// src/app/app.ts
import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ComponenteDesejado } from "./components/componente-desejado/componente-desejado"; // importação do componente

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ComponenteDesejado], // disponibiliza o <app-componente-desejado> neste template
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("navegacao");
}
```

> **Componente pai ➝** contém o filho no template (`<app-componente-desejado />`), importa-o em imports e passa dados para o filho.
> **Componente filho ➝** é usado dentro do pai. Recebe dados via `@Input()` e emite eventos de volta ao pai via `@Output()`/`EventEmitter`.

Depois, use o seletor no template do componente pai (ex.: `app.html`):

```html
<componente-desejado />
<!-- 👆🏻 nome = valor do selector -->
```

Para mudar o seletor, gere com `--selector` **ou** edite o campo `selector` no decorator @Component.

---

> **AVISO IMPORTANTE!!!**
>
> No Angular 20, o CLI simplificou simplificou a convenção de nomes de arquivos, passando a gerar **nome curtos**, sem os sufixos no meio.
>
> Ex.: `home.ts`, `home.html`, `home.scss` (em vez de `home.component.ts/html/scss`).
>
> Os nome curtos valem para os componentes (`.components`), serviço (`.serviço`) e diretiva (`.iretiva`).
>
> Porém os geradores de outros artefatos mantêm o sufixo tipo no nome do arquivo, só que com **hífen** (não mais com ponto):
>
> - Guards → `auth-guard.ts`
> - Interceptors → `logging-interceptor.ts`
> - Resolvers → `user-resolver.ts`
> - Modules → `shared-module.ts`
> - Pipes → `currency-pipe.ts`

---

### Boas práticas rápidas

- **Kebab-case consistente**: mantenha o mesmo nome base entre `.ts`/`.html`/`.scss`/`.spec.ts`.
- **Uma responsabilidade por componente**: UI e lógica de apresentação; mova regra de negócio para **services**.
- **Imports explícitos**: adicione em `imports` tudo que o template requer.
- **Padrões modernos**: use o **control flow** novo (`@if`, `@for`, `@switch`) e **Signals** quando precisar de estado local reativo e previsível.

---

---

## Aula 08 - Ciclo de vida de componentes Angular

> **Ideia central**: _um componente passa por fases_ (criação → projeção de conteúdo → renderização da view → atualizações → limpeza).
> Cada _hook_ existe para resolver um tipo de necessidade. Use o ponto certo para cada ação.

---

### Ordem de execução (resumo mental)

1. `constructor()`
2. `ngOnChanges(changes)` _(quando houver `@Input()`)_
3. `ngOnInit()`
4. **Content projection**
   - `ngAfterContentInit()`
   - `ngAfterContentChecked()` (pode repetir a cada verificação)
5. **View**
   - `ngAfterViewInit()`
   - `ngAfterViewChecked()` (pode repetir a cada verificação)
6. `ngDoCheck()` _(se você criar detecção customizada; roda com alta frequência)_
7. `ngOnDestroy()` _(onde limpar recursos)_

> Observação: `ngOnChanges` dispara **antes** do `ngOnInit` e sempre que um `@Input()` mudar.

---

### Quando usar **cada um**

- **`constructor()`**
  Injete dependências e inicialize **estado leve**. **Não** acesse o DOM nem dados de `@Input()` (ainda não foram setados).

- **`ngOnInit()`** (`implements OnInit`)
  Componente está pronto para iniciar lógica inicial.
  **Use para**: carregar dados iniciais, configurar _subscriptions_ (com limpeza planejada), iniciar timers/efeitos.

- **`ngOnChanges(changes)`** (`implements OnChanges`)
  Reage a **mudanças de `@Input()`** — inclusive a primeira atribuição.
  **Use para**: recalcular algo quando o pai mudar um `@Input`.

- **`ngDoCheck()`** (`implements DoCheck`)
  Hook de **detecção customizada** (roda muito).
  **Use raramente**: apenas quando `OnChanges` não cobre (ex.: comparação profunda de objetos mutáveis).
  **Cuidado**: pode afetar performance.

- **`ngAfterContentInit()` / `ngAfterContentChecked()`**
  Relacionados à **projeção de conteúdo** (`<ng-content>`).
  **Use para**: interagir com conteúdo projetado via `@ContentChild/@ContentChildren`.
  `AfterContentChecked` roda repetidamente em cada ciclo de verificação.

- **`ngAfterViewInit()` / `ngAfterViewChecked()`**
  A **view** e os `@ViewChild/@ViewChildren` já existem.
  **Use para**: acessar elementos do template, integrações com bibliotecas de UI que dependem do DOM renderizado.
  `AfterViewChecked` pode rodar muitas vezes; evite lógica pesada aqui.

- **`ngOnDestroy()`** _(verá em outra aula)_
  **Use para**: cancelar _subscriptions_, _timeouts_, _intervals_, _observers_ do DOM, _listeners_ e qualquer recurso nativo (ex.: `IntersectionObserver`).

---

### Exemplos práticos

**1. `OnInit` + `OnChanges` com `@Input()`**

```ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-user-card",
  template: `<h3>{{ user?.name }}</h3>`,
})
export class UserCardComponent implements OnInit, OnChanges {
  @Input() userId!: string;
  user: { id: string; name: string } | null = null;

  ngOnInit() {
    // Carregue dependências que não dependem de @Input()
    // Ex.: inicializar serviços, telemetry, etc.
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["userId"] && this.userId) {
      // Reaja imediatamente a mudanças do pai
      // this.user = ...
    }
  }
}
```

**2. Content vs View (`AfterContentInit` e `AfterViewInit`)**

```ts
import {
  Component,
  ContentChild,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-panel",
  template: `
    <section>
      <header><ng-content select="[panel-title]"></ng-content></header>
      <div #contentArea><ng-content></ng-content></div>
    </section>
  `,
})
export class PanelComponent implements AfterContentInit, AfterViewInit {
  @ContentChild("titleTpl") titleTpl!: any; // algo vindo de fora via <ng-content>
  @ViewChild("contentArea") contentArea!: ElementRef; // elemento do próprio template

  ngAfterContentInit() {
    // Conteúdo projetado disponível (ng-content)
    // console.log(this.titleTpl);
  }

  ngAfterViewInit() {
    // Elementos do template estão no DOM
    // this.contentArea.nativeElement.focus();
  }
}
```

**3. `DoCheck` (evite, a menos que precise)**

```ts
import { DoCheck } from "@angular/core";

export class HeavyListComponent implements DoCheck {
  private prevHash = "";

  ngDoCheck() {
    // Comparação customizada (cuidado com custo!)
    // if (this.hash(this.items) !== this.prevHash) { ... }
  }
}
```

---

### Evitar **vazamento de memória** (lifetime seguro)

- Prefira **`async` pipe** no template para _subscriptions_ (`| async`) — o Angular desinscreve automaticamente.
- Para _subscriptions_ no código:
  - `takeUntilDestroyed()` (Angular 16+) **ou** `DestroyRef` + `effect()`/`onCleanup()`
  - Estratégia clássica: `Subject` + `takeUntil()` usando `ngOnDestroy()`.

**Exemplo com `takeUntilDestroyed`**

```ts
import { Component, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  template: `<!-- lista -->`,
})
export class UsersComponent implements OnInit {
  private users = inject(UsersService);

  ngOnInit() {
    this.users.stream$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

> Regra de bolso: **“Abri? Tenho que fechar.”**
> Subscriptions, timers, websockets, observers de DOM… limpe tudo no `ngOnDestroy()` _(ou usando utilitários que limpam por você)_.

---

### Erros comuns (e como evitar) [Aula 08]

- **Ler `@Input()` no `constructor`** → `@Input()` ainda não está definido. Use `ngOnInit`/`ngOnChanges`.
- **Lógica pesada em `AfterViewChecked/AfterContentChecked`** → rodam muitas vezes; mova para `OnInit/AfterViewInit` ou otimize.
- **Esquecer de desinscrever** → use `async` pipe, `takeUntilDestroyed` ou limpe no `ngOnDestroy`.
- **Usar `DoCheck` sem necessidade** → prefira `OnChanges`; se precisar, otimize para evitar trabalho redundante.

---

### Checklist rápido

- Precisa de **DI** e setup leve? → `constructor()`
- Reagir a **mudança de `@Input()`**? → `ngOnChanges()`
- **Inicialização** (fetch inicial, timers, subs)? → `ngOnInit()`
- Lidar com **< ng-content >**? → `ngAfterContentInit/Checked()`
- Acessar **elementos do template** (`@ViewChild`)? → `ngAfterViewInit/Checked()`
- Detecção **custom**? → `ngDoCheck()` _(apenas se necessário)_
- **Limpeza** de recursos? → `ngOnDestroy()` _(na próxima aula)_

---

---

## Aula 09 — Tipos de Data Binding no Angular

> **Ideia central**: _binding_ é a forma de **sincronizar dados** entre **classe (TypeScript)** e **template (HTML)**.
> No Angular temos **4 formas** principais:
>
> - **interpolação**,
> - **property binding**,
> - **event binding** e
> - **two-way data binding**.

---

### Visão geral rápida

| Tipo                 | Direção           | Sintaxe                     | Quando usar                                                  |
| -------------------- | ----------------- | --------------------------- | ------------------------------------------------------------ |
| **Interpolação**     | Classe → Template | `{{ expressão }}`           | Mostrar valores (texto) no HTML                              |
| **Property binding** | Classe → Template | `[propriedade]="expressão"` | Definir **propriedades** de elementos/Componentes/Directivas |
| **Event binding**    | Template → Classe | `(evento)="expressão"`      | Reagir a eventos do DOM/Componentes                          |
| **Two-way binding**  | Classe ↔ Template | `[(ngModel)]="prop"`        | Inputs com leitura/escrita (formularios simples)             |

---

### 1. Interpolação

- **Direção**: **somente leitura** da classe para o HTML.
- **Uso típico**: texto, atributos que aceitam _string_ no conteúdo (ex.: dentro de tags).

**Exemplo**:

```ts
// .ts
title = "Título desejado";
user = { name: "Ana", score: 42 };
```

```html
<!-- .html -->
<h1>{{ title }}</h1>
<p>Usuário: {{ user.name }} — Pontos: {{ user.score }}</p>
```

**Boas práticas**:

- Use o **operador de navegação segura** `{{ user?.name }}` quando algo pode ser nulo/indefinido.
- Evite expressões pesadas (chamar funções caras) dentro de `{{ ... }}`.

---

### 2. Property Binding

- **Direção**: classe → template, **em propriedades reais** do elemento/Componente/Directiva (não apenas atributos HTML).
- **Vantagem**: trabalha com **tipos** e recursos do DOM/Componentes (ex.: `[disabled]`, `[value]`, `[src]`, `[ngClass]`).

**Exemplo**:

```ts
// .ts
imgURL = "https://exemplo.com/imagem.png";
isDisabled = true;
```

```html
<!-- .html -->

<img [src]="imgURL" alt="Imagem" />
<button [disabled]="isDisabled">Enviar</button>
```

**Dicas**:

- Para **atributos** específicos (ex.: `aria-label`): use **attribute binding** → `[attr.aria-label]="rotulo"`.
- Para **classes/estilos**: `[class.nome]="condicao"`, `[style.width.px]="largura"`.

---

### 3. Event Binding

- **Direção**: template → classe (o template **emite** um evento para o TS reagir).
- **Uso típico**: cliques, teclas, mudanças de valor, eventos custom de componentes.

**Exemplo**:

```ts
// .ts
chamarFuncao() {
// ação a executar quando o botão for clicado
}
```

```html
<!-- .html -->

<button (click)="chamarFuncao()">Acionar</button>
```

**Dicas**:

- Eventos do DOM: `(click)`, `(input)`, `(keyup.enter)`, etc.
- Componentes filhos podem emitir eventos próprios com `@Output()` → você consome com `(evento)="..."`.

---

### 4. Two-Way Data Binding (Template-driven)

- **Direção**: **mão dupla** (classe ↔ template).
- **Requisito**: **FormsModule**. Em projetos **standalone**, importe no **componente** (ou em providers via `importProvidersFrom`).

**Exemplo (standalone component)**:

```ts
// .ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-nome",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./nome.component.html",
})
export class NomeComponent {
  title = "Título desejado";
}
```

```html
<!-- .html -->

<input [(ngModel)]="title" placeholder="Digite o título" />

<p>Valor atual: {{ title }}</p>
```

**Observações importantes**:

- O “**banana in a box**” `[( ... )]` é literalmente **property + event** sob o capô.
- Em formulários com **Reactive Forms**, use **FormControl/ControlName** (não misture com `ngModel` no mesmo controle).
- Para formularios maiores/complexos, prefira **Reactive Forms** (mais previsíveis e testáveis).

---

### Escolhas e equivalências úteis

- `[value]="prop"` + `(input)="prop = $event.target.value"` **≈** `[(ngModel)]="prop"` (mas `ngModel` exige **FormsModule**).
- `[src]` **vs** atributo `src`: o binding usa **propriedade** do elemento (aplica tipos/validação do DOM).
- Segurança: Angular **sanitiza** bindings em URLs/HTML; para casos especiais, use `DomSanitizer` (com cautela!).

---

### Erros comuns (e como evitar) [Aula 09]

- **Esquecer de importar FormsModule** → `[(ngModel)]` não funciona.
- **Funções caras** em interpolação/bindings → _jank_ de performance (prefira getters/sinais ou pré-computar).
- **Misturar ngModel com Reactive Forms** no mesmo controle → conflitos e avisos.
- **Confundir atributo com propriedade**: para bindings, use **propriedade** (`[disabled]`, `[value]`, `[src]`).

---

### Exemplos resumidos

**1. Interpolação**:

```ts
// .ts
title = "titulo desejado";
```

```html
<!-- .html -->
<h1>{{ title }}</h1>
```

**2. Property binding**:

```ts
// .ts
imgURL = "link/endereco-da-imagem";
```

```html
<!-- .html -->
<img [src]="imgURL" />
```

**3. Event binding**:

```ts
// .ts
chamarFuncao() {}
```

```html
<!-- .html -->
<button (click)="chamarFuncao()">Clique</button>
```

**4. Two-way data binding**:

```ts
// .ts (standalone)
import { FormsModule } from "@angular/forms";
imports: [FormsModule];
title = "titulo desejado";
```

```html
<!-- .html -->
<input [(ngModel)]="title" />
```

---

---

## Aula 10 — Diretivas de decisão `@if` e `@switch`

> Desde o Angular 17, o **novo control flow** (blocos `@if`, `@switch`, `@for`) substitui as diretivas estruturais antigas (`*ngIf`, `*ngSwitch`, `*ngFor`).
> No Angular 20, esse novo padrão é o **recomendado**. As diretivas antigas estão **deprecadas** e têm **remoção prevista** (indicada para v22).

---

### Por que usar `@if` / `@switch`?

- **Sintaxe mais clara** (dispensa `ng-template` auxiliar para `else`).
- **Melhor performance/diagnóstico** de templates.
- **Composição simples**: aninhar `@if`/`@switch`, usar `@else if`, etc.

---

### 1. `@if` (com `@else` e `@else if`)

- **`@if (condição) { … }`**: renderiza o bloco **se** a condição for verdadeira.
- **`@else { … }`**: alternativa quando a condição for falsa.
- **`@else if (outraCondição) { … }`**: encadeia novas verificações sem criar vários níveis de aninhamento.

**Exemplos**:

```html
@if (title) {
<h1>{{ title }}</h1>
} @else {
<h1>mensagem caso title vazio</h1>
}
```

```html
@if (title === 'ok') {
<p>Estado: OK</p>
} @else if (title === 'erro') {
<p>Estado: ERRO</p>
} @else {
<p>Estado: desconhecido</p>
}
```

**Dicas**:

- Variáveis auxiliares com `@let`:

  ```html
  @let trimmed = title?.trim(); @if (trimmed?.length) {
  <h2>{{ trimmed }}</h2>
  } @else {
  <h2>Sem título</h2>
  }
  ```

- `@if` aceita qualquer expressão booleana (ex.: `!!valor`).

---

#### Antes (antigo `*ngIf`)

- Dependia de `ng-template` para o ramo alternativo e era comum aninhar condições.

```html
<h1 *ngIf="title; else mensagemPadrao">{{ title }}</h1>
<ng-template #mensagemPadrao>
  <h1>mensagem caso title vazio</h1>
</ng-template>
```

---

### 2. `@switch` (com `@case` e `@default`)

- **`@switch (expressão) { … }`**: escolhe um bloco a partir do valor da expressão.
- **`@case (valor) { … }`**: ramo executado quando há **igualdade estrita** com a expressão.
- **`@default { … }`**: caso padrão quando nenhum `@case` corresponde.

**Exemplos**:

```html
@switch (title) { @case ('sim') {
<p>Mensagem se SIM</p>
} @case ('nao') {
<p>Mensagem se NÃO</p>
} @default {
<p>Mensagem padrão</p>
} }
```

**Dicas**:

- `@case` usa comparação **estrita**; cuide dos tipos (ex.: `'true'` ≠ `true`).
- Exemplo com booleanos:

  ```html
  @switch (isValid) { @case (true) {
  <p>Válido</p>
  } @case (false) {
  <p>Inválido</p>
  } @default {
  <p>Indeterminado</p>
  } }
  ```

#### Antes (antigo `*ngSwitch`)

```html
<span [ngSwitch]="title">
  <p *ngSwitchCase="'sim'">Mensagem se SIM</p>
  <p *ngSwitchCase="'nao'">Mensagem se NÃO</p>
  <p *ngSwitchDefault>Mensagem padrão</p>
</span>
```

---

### 3. Exemplos “1:1” (mapeando do antigo para o novo) [Aula 10]

#### `*ngIf` + `else` → `@if` + `@else`

```html
<!-- Antigo -->
<h1 *ngIf="title; else vazio">{{ title }}</h1>
<ng-template #vazio><h1>Sem título</h1></ng-template>

<!-- Novo -->
@if (title) {
<h1>{{ title }}</h1>
} @else {
<h1>Sem título</h1>
}
```

#### `*ngSwitchCase` / `*ngSwitchDefault` → `@case` / `@default`

```html
<!-- Antigo -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Carregando…</p>
  <p *ngSwitchCase="'ready'">Pronto!</p>
  <p *ngSwitchDefault>Desconhecido</p>
</div>

<!-- Novo -->
@switch (status) { @case ('loading') {
<p>Carregando…</p>
} @case ('ready') {
<p>Pronto!</p>
} @default {
<p>Desconhecido</p>
} }
```

---

### 4. Boas práticas [Aula 10]

- **Prefira o novo control flow** (`@if`, `@switch`) em código novo e durante migrações.
- Evite **lógica pesada** no template; pré-compute no componente ou use **Signals**.
- Seja **explícito em tipos** no `@switch` para evitar armadilhas de comparação.

---

### 5. Erros comuns (e como evitar) [Aula 10]

- Esquecer **chaves/blocos**: `@if (...) { … } @else { … }`.
- **Misturar** antigo e novo no mesmo trecho sem necessidade.
- Usar `@case` com **tipo diferente** do valor comparado.

---

### 6. Exemplo completo (componente simples) [Aula 10]

**Template (`app.html`)**:

```html
<input [(ngModel)]="title" placeholder="Digite um título" />

@if (title) {
<h2>{{ title }}</h2>
} @else {
<h2>Informe um título</h2>
} @switch (title?.toLowerCase()) { @case ('sim') {
<p>Você digitou SIM</p>
} @case ('não') {
<p>Você digitou NÃO</p>
} @default {
<p>Outro valor</p>
} }
```

**Classe (`app.ts`)**:

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  standalone: true, // no v20 standalone é padrão; alguns schematics podem omitir
  templateUrl: "./app.html",
  imports: [FormsModule],
})
export class AppComponent {
  title = "";
}
```

> **Lembrete**: Na **v20** é comum ver arquivos com nomes mais curtos (ex.: `app.ts`, `app.html`, `app.scss`) e tags sem conteúdo em forma **auto-fechada** (ex.: `<router-outlet />`).

---

---

## Aula 11 — Diretivas estruturais: `@for`

> Desde o Angular 17, o **novo control flow** (blocos `@if`, `@switch`, `@for`) substitui as diretivas estruturais antigas (`*ngIf`, `*ngSwitch`, `*ngFor`).
> No Angular 20, esse novo padrão é o **recomendado**. As diretivas antigas estão **deprecadas** e têm **remoção prevista** (indicada para v22).

---

### Por que usar `@for`?

- **Sintaxe mais clara e previsível** para iteração.
- **Performance superior** com estratégia de diferenciação eficiente.
- **Recursos embutidos**:
  - `@empty` para estado vazio (sem `ng-template` extra).
  - Variáveis locais: `index`, `count`, `first`, `last`, `even`, `odd`.
  - **Rastreamento** com `track…` (equivalente ao `trackBy` do antigo).
  - **Fatiamento** com `slice` e **ordenação** com `orderBy` (quando aplicável; ou compute antes no TS).

---

### 1. `@for` (com `@empty` e `track`)

**Explicações**:

- **`@for (item of lista; track item.id) { … }`**: itera sobre `lista` renderizando o bloco para cada `item`, rastreando por `item.id`.
- **`@empty { … }`**: ramo renderizado quando a lista está vazia.
- Variáveis locais fornecidas pelo loop:
  - `index` (índice 0-base), `count` (tamanho), `first`, `last`, `even`, `odd`.

**Exemplo**:

```html
@for (item of baseDeDados; track item.nome) {
<tr>
  <td>{{ item.nome }}</td>
  <td>{{ item.sexo }}</td>
  <td>{{ item.idade }}</td>
</tr>
} @empty {
<tr>
  <td colspan="3">Sem registros</td>
</tr>
}
```

**Exemplo com variáveis locais**:

```html
@for (item of baseDeDados; track item.nome; let i = index; let total = count) {
<tr>
  <td>{{ i + 1 }} / {{ total }}</td>
  <td>{{ item.nome }}</td>
  <td>{{ item.sexo }}</td>
  <td>{{ item.idade }}</td>
</tr>
} @empty {
<tr>
  <td colspan="4">Sem registros</td>
</tr>
}
```

**Dicas**:

- **Sempre que possível, use `track`** com uma chave **estável** (id/nome único) para evitar re-renderizações desnecessárias.
- **Pré-processe** dados no TS (filtro/ordenação/paginação) em vez de lógica pesada no template.
- Para listas grandes, considere **virtualização** (libs externas) e fragmentar a UI.

---

#### Antes (antigo `*ngFor`)

- Exigia atributo estrutural e, para tratar vazio, era comum usar `*ngIf` ou `ng-template`.

```html
<tr *ngFor="let item of baseDeDados">
  <td>{{ item.nome }}</td>
  <td>{{ item.sexo }}</td>
  <td>{{ item.idade }}</td>
</tr>
```

---

### 3. Exemplos “1:1” (mapeando do antigo para o novo) [Aula 11]

**Antigo → Novo (com vazio e track)**:

```html
<!-- Antigo -->
<tr *ngFor="let item of baseDeDados; trackBy: trackByNome">
  <td>{{ item.nome }}</td>
  <td>{{ item.sexo }}</td>
  <td>{{ item.idade }}</td>
</tr>
<!-- (e um *ngIf separado para lista vazia) -->

<!-- Novo -->
@for (item of baseDeDados; track item.nome) {
<tr>
  <td>{{ item.nome }}</td>
  <td>{{ item.sexo }}</td>
  <td>{{ item.idade }}</td>
</tr>
} @empty {
<tr>
  <td colspan="3">Sem registros</td>
</tr>
}
```

**Com índice e paridade**:

```html
<!-- Antigo -->
<tr *ngFor="let item of baseDeDados; let i = index; let e = even">
  <td [class.linha-par]="e">{{ i + 1 }}</td>
  <td>{{ item.nome }}</td>
</tr>

<!-- Novo -->
@for (item of baseDeDados; let i = index; let e = even) {
<tr [class.linha-par]="e">
  <td>{{ i + 1 }}</td>
  <td>{{ item.nome }}</td>
</tr>
}
```

---

### 4. Boas práticas [Aula 11]

- **Rastreie** com `track item.id` (ou outra chave única) para melhor desempenho.
- **Evite funções no template** (ex.: `calculaAlgo(item)`): compute no TS, use **Signals** ou getters baratos.
- **Divida componentes** quando a linha ficar complexa (melhora legibilidade e reuso).
- **Mostre estado vazio** com `@empty` (UX melhor).

---

### 5. Erros comuns (e como evitar) [Aula 11]

- **Esquecer o `@empty`** e renderizar tabela vazia sem feedback.
- **Rastreamento instável** (`track index`) → elementos piscando/re-montando; prefira uma chave **estável**.
- **Mutar arrays diretamente** sem atualizar referência (em listas controladas por Signals/immutability): **crie novo array** ao atualizar.

---

### 6. Exemplo completo (componente simples) [Aula 11]

**Classe (`lista.ts`)**:

```ts
import { Component } from "@angular/core";
import { NgClass } from "@angular/common";

type Pessoa = {
  nome: string;
  sexo: "feminino" | "masculino";
  idade: number;
};

@Component({
  selector: "app-lista",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./lista.html",
  styleUrls: ["./lista.scss"],
})
export class ListaComponent {
  baseDeDados: Pessoa[] = [
    { nome: "nome1", sexo: "feminino", idade: 20 },
    { nome: "nome2", sexo: "masculino", idade: 37 },
    { nome: "nome3", sexo: "masculino", idade: 18 },
    { nome: "nome4", sexo: "feminino", idade: 63 },
  ];
}
```

**Template (`lista.html`)** — usando `@for`, `@empty` e variáveis locais:

```html
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Nome</th>
      <th>Sexo</th>
      <th>Idade</th>
    </tr>
  </thead>

  <tbody>
    @for (item of baseDeDados; track item.nome; let i = index; let total =
    count; let e = even) {
    <tr [class.linha-par]="e">
      <td>{{ i + 1 }}/{{ total }}</td>
      <td>{{ item.nome }}</td>
      <td>{{ item.sexo }}</td>
      <td>{{ item.idade }}</td>
    </tr>
    } @empty {
    <tr>
      <td colspan="4">Sem registros</td>
    </tr>
    }
  </tbody>
</table>
```

**Estilo opcional (`lista.scss`)**

```scss
.linha-par {
  background: rgba(0, 0, 0, 0.04);
}
```

---

> **Lembrete (v20)**: é comum ver arquivos com nomes mais curtos (ex.: `lista.ts`, `lista.html`, `lista.scss`) e tags sem conteúdo em forma **auto-fechada** (ex.: `<router-outlet />`).

---

---

## Aula 13 — Criando **Pipes customizadas**

> **Pipes** permitem aplicar transformações de exibição diretamente no **template**, sem alterar o dado original.

---

### Por que criar uma pipe customizada?

- **Reuso de formatações** específicas do seu domínio (ex.: normalizar sexo, CEP, CPF, CNPJ, telefone).
- **Separação de responsabilidades**: o componente fica limpo; a transformação fica encapsulada.
- **Testabilidade**: lógica de transformação isolada em uma classe pequena e fácil de testar.

---

## 1. Como gerar uma pipe

**Comando:**

```bash
ng generate pipe <nome>
```

Comando reduzido:

```bash
ng g p <nome>
```

> **Importante**: `<nome>` na verdade representa um **caminho**, onde barras "`/`" separam pasta e subpastas. O **último segmento** define **(a)** a **pasta final** criada, **(b)** o `name` **do pipe** (propriedade do decorator `@Pipe`), e **(c)** o **nome da classe** em **PascalCase** (convencionalmente terminando em **Pipe**).  
> Ex.: `pipe/nome-do-pipe` → classe `NomeDoPipe`, name `nomeDoPipe`.

- **Opicionalmente**, pode adicionar "`--skip-tests`" no fim do comando gerador para não criar o arquivo de teste.

---

## 2. Exemplo: pipe `sexo`

Objetivo: exibir **Masculino** ou **Feminino** a partir de valores curtos (`m`/`f`) ou variações.

**Gerando:**

```bash
ng g p pipes/sexo
```

**Implementação (`pipes/sexo-pipe.ts`):**

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sexo",
})
export class SexoPipe implements PipeTransform {
  transform(value: unknown): string {
    if (value == null) return "Não informado";

    const v = String(value).trim().toLowerCase();
    // aceita várias formas de entrada
    if (v === "f" || v === "feminino" || v === "fem") return "Feminino";
    if (v === "m" || v === "masculino" || v === "masc") return "Masculino";

    // fallback: mantém original capitalizado
    return (
      v.charAt(0).toLocaleUpperCase("pt-BR") +
      v.slice(1).toLocaleLowerCase("pt-BR")
    );
  }
}
```

**Usando em um componente (`lista.ts`):**

```ts
import { Component } from "@angular/core";
import { SexoPipe } from "./pipes/sexo.pipe";

@Component({
  selector: "app-lista",
  standalone: true,
  imports: [SexoPipe], // importa a pipe standalone
  templateUrl: "./lista.html",
})
export class ListaComponent {
  baseDeDados = [
    { nome: "nome1", sexo: "f", idade: 20, salario: 5500 },
    { nome: "nome2", sexo: "m", idade: 37, salario: 2980 },
  ];
}
```

**Template (`lista.html`):**

```html
<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Sexo</th>
      <th>Idade</th>
    </tr>
  </thead>
  <tbody>
    @for (item of baseDeDados; track item.nome) {
    <tr>
      <td>{{ item.nome }}</td>
      <td>{{ item.sexo | sexo }}</td>
      <td>{{ item.idade }}</td>
    </tr>
    } @empty {
    <tr>
      <td colspan="3">Sem registros</td>
    </tr>
    }
  </tbody>
</table>
```

---

## 3. Boas práticas

- **Control flow moderno**: combine com `@for`/`@if`/`@switch` para escrever templates mais claros.
- **Pure vs Impure**: mantenha `pure: true`. Só use `pure: false` quando realmente precisar reagir a **mudanças internas** de objetos/arrays **sem trocar a referência** (custa performance).
- **Null-safety**: trate `null`/`undefined` e valores inesperados; exiba um **fallback** amigável.
- **Nomes claros**: o `name` da pipe deve refletir o que ela faz (ex.: `cpf`, `telefone`, `sexo`).
- **Testes**: mantenha casos cobrindo entradas válidas, inválidas e bordas (vazio, nulo, maiúsculas/minúsculas).

---

## 4. Erros comuns (e como evitar)

- **Esquecer de importar a pipe standalone** no componente → adicione em `imports: [MinhaPipe]`.
- **Marcar impura sem necessidade** → pipes impuras executam com alta frequência; evite.
- **Lógica pesada** dentro da pipe → mova para serviços/precompute; pipe deve ser leve.
- **Alterar o dado original** dentro da pipe → pipe deve **somente formatar/transformar para exibição**.

---

## 5. Exemplo completo (variação com opções)

Suponha que você queira exibir abreviação (`M`/`F`) quando houver a opção `short: true`.

**Pipe (`sexo.pipe.ts`):**

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "sexo", standalone: true, pure: true })
export class SexoPipe implements PipeTransform {
  transform(value: unknown, options?: { short?: boolean }): string {
    const v = String(value ?? "")
      .trim()
      .toLowerCase();
    const isF = v === "f" || v === "fem" || v === "feminino";
    const isM = v === "m" || v === "masc" || v === "masculino";

    if (options?.short) {
      if (isF) return "F";
      if (isM) return "M";
      return "";
    } else {
      if (isF) return "Feminino";
      if (isM) return "Masculino";
      return "Não informado";
    }
  }
}
```

**Uso no template:**

```html
<p>Longo: {{ 'f' | sexo }}</p>
<p>Curto: {{ 'f' | sexo:{ short: true } }}</p>
```

---

## 6. Notas sobre Angular 20

- **Standalone por padrão**: pipes standalone funcionam muito bem com **componentes standalone**.
- **Control flow moderno**: combine com `@for`/`@if`/`@switch` para escrever templates mais claros.
- **Arquivos**: ainda é comum encontrar o sufixo `.pipe.ts`; alguns esquemas podem preferir nomes mais curtos em projetos recentes. O comportamento pode variar conforme o template de projeto e atualizações do CLI.

---

---

## Aula 14 — Criando componentes e adicionando navegação

Em apps de página única (SPA), **navegação** significa trocar a **view** em exibição manipulando o **DOM**: o framework reconcilia e atualiza **somente** os trechos necessários da interface, sem pedir um novo documento HTML ao servidor. No Angular, o responsável por isso é o **Router**, que associa **URLs** a **componentes** (páginas) e administra o histórico do navegador.

---

### Importância do uso de rotas

- **Navegação previsível**: mapeia URLs claras para componentes/páginas, tornando a experiência consistente.
- **URLs compartilháveis**: cada tela tem endereço próprio (deep link, favoritos, histórico).
- **Segurança e controle**: **guards** e **resolvers** controlam acesso, redirecionamentos e carregamento de dados antes da entrada.
- **Performance**: **lazy loading** e **preloading** reduzem o tempo de carregamento inicial e otimizam a entrega por demanda.
- **Acessibilidade e UX**: integra com Voltar/Avançar, restauração de rolagem e títulos de página.
- **SEO (com SSR/Prerender)**: viabiliza indexação de páginas públicas e pré-visualizações ricas (cards com título, descrição e imagem ao compartilhar links).
- **Escalabilidade**: organiza o código por features/rotas, facilitando manutenção e crescimento.
- **Observabilidade**: facilita métricas, analytics e monitoramento por rota.

---

### Por que `routerLink="page1"` em vez de `href="page1"`?

- **Sem recarregar o documento**: o `routerLink` usa o **Router** para navegação **client-side** enquanto `href` dispara um **full reload**.
- **Estado e histórico controlados**: o Router usa a **History API** sem perder o estado da aplicação.
- **APIs de navegação**: suporte a **query params**, **fragment**, **navigation extras** (ex.: `{ state }`) e **links relativos**:

  ```html
  <a [routerLink]="['/page1']" [queryParams]="{ filtro: 'novos' }">Page 1</a>
  ```

- **Estilização do link ativo**: com `routerLinkActive="active"` e `[routerLinkActiveOptions]="{ exact: true }"`.
- **Coerência com rotas protegidas**: respeita **guards**, **resolvers** e estratégias de **lazy loading**.
- **Acessibilidade**: continua sendo uma âncora `<a>` válida (com `href` gerado), mas gerenciada pelo Router.

> **Resumo**: use **`routerLink`** para que o Angular gerencie a navegação de forma **rápida, controlada e integrada** ao ecossistema.

---

### Passo a passo básico

Havendo as páginas **Page1** e **Page2** geradas pelo comando `ng g c pages/page1` e `ng g c pages/page2` ou simplesmente:

```bash
`ng g c pages/page1 && ng g c pages/page2`
```

> **Nota sobre `&&`**: na maioria dos shells (bash, zsh, PowerShell, etc.), `&&` **encadeia comandos** e só executa o próximo se o anterior teve sucesso (exit code 0). Se algum falhar, a cadeia é interrompida.

Para contruir uma navegação entre as páginas é necessário seguir os passos a seguir:

---

#### 1. Registrar as rotas

As rotas são fornecidas no bootstrap via `provideRouter(routes)` em `src/app/app.config.ts`.

```ts
// src/app/app.config.ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

Crie/edite `src/app/app.routes.ts` mapeando caminhos (URLs) para páginas (componentes):

> obs: No `app.routes.ts` o array tipado `export const routes: Routes = []` reúne todas as rotas da aplicação que o `provideRouter` usa para criar a navegação.

- Importe no `app.routes.ts` os componente que serão usados como destinos da navegação (ex.: `import { Page1 } from './pages/page1/page1';`).
- Insira em `export const routes: Routes = []` as rotas como objeto (ex.: `{ path: '', component: Page1 }`)
- **(Recomendação):** Use uma _rota curinga_ (ex.: `{ path: "**", redirectTo: "" }`) para redireciona qualquer URL não reconhecida para uma rota conhecida.

  > **Nota:** Implemente o `fallback` (rota curinga ou erro 404) por último no array de rotas, pois ela casa com qualquer caminho e, se vier antes, bloqueará as demais.

```ts
// src/app/app.routes.ts
import { Routes } from "@angular/router";
import { Page1 } from "./pages/page1/page1"; // importação da página 1
import { Page2 } from "./pages/page2/page2"; // importação da página 2

export const routes: Routes = [
  { path: "", component: Page1 }, // rota inicial
  { path: "page2", component: Page2 }, // rota para a página 2
  { path: "**", redirectTo: "" }, // fallback: URLs desconhecidas vão para a Home
];
```

**Alguns atributos do objeto rota**:

- **`path` ➝** segmento de URL que ativa a rota. '' (vazio) costuma ser a rota inicial (home):

  ```ts
  { path: 'caminho', component: NomeDoComponente }
  ```

- **`component` ➝** componente exibido quando o path casa:

  ```ts
  { path: 'caminho', component: NomeDoComponente }
  ```

- **`pathMatch` ➝** como casar o caminho (muito usado com `path: ''`)

  - **`pathMatch: 'full'` ➝** exige correspondência exata (home típica).

    ```ts
    { path: '', component: Home, pathMatch: 'full' }
    ```

  - **`pathMatch: 'prefix'` ➝** considera prefixo (comum em redirecionamentos).

    ```ts
    { path: 'page1', component: Page1, pathMatch: 'prefix' }
    ```

- **`redirectTo` ➝** em vez de renderizar um componente, redireciona para outro caminho (interno).

  ```ts
  { path: "**", redirectTo: "" }
  ```

- **`title` ➝** define `document.title` quando a rota é ativada (útil para SEO/UX).

  ```ts
   path: 'sobre', component: SobrePage, title: 'Sobre — MinhaApp' }
  ```

- **`loadComponent` ➝** lazy-load de componente standalone (carrega sob demanda).

  ```ts
  {
    path: 'relatorio',
    loadComponent: () => import('./pages/relatorio/relatorio')
      .then(m => m.RelatorioPage),
    title: 'Relatório'
  }
  ```

- **`children` ➝** define rotas filhas (aninhadas).

  ```ts
    {
    path: 'admin',
    children: [
      { path: 'usuarios', component: AdminUsersPage, title: 'Usuários' },
      { path: 'config', component: AdminConfigPage, title: 'Configurações' },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  }
  ```

- **`outlet` ➝** enviar conteúdo para um router-outlet nomeado (rotas auxiliares).

  ```ts
  // Template possui <router-outlet name="sidebar"></router-outlet>
  { path: 'ajuda', component: AjudaSidebar, outlet: 'sidebar' }
  // URL de exemplo: /(sidebar:ajuda)
  ```

- **`data` ➝** metadados arbitrários para usar em guards, componentes, etc.

  ```ts
  { path: 'relatorio', component: RelatorioPage, data: { requiresAuth: true, area: 'financeiro' } }
  ```

- **`runGuardsAndResolvers` ➝** controla quando reevaluar guards/resolvers (ex.: 'paramsChange').

  ```ts
  {
    path: 'perfil/:id',
    component: PerfilPage,
    resolve: { perfil: perfilResolver },
    runGuardsAndResolvers: 'paramsChange' // reexecuta ao mudar :id
  }
  // Alternativas: 'always' | 'paramsOrQueryParamsChange'
  ```

- **`matcher` ➝** função personalizada para casar URLs com lógica própria.

  ```ts
  import { UrlSegment } from '@angular/router';

  export function skuMatcher(segments: UrlSegment[]) {
    // casa /produto/<SKU-ALFANUMÉRICO>
    if (segments.length === 2 && segments[0].path === 'produto' && /^[A-Z0-9-]+$/.test(segments[1].path)) {
      return { consumed: segments, posParams: { sku: segments[1] } };
    }
    return null;
  }

  { matcher: skuMatcher, component: ProdutoDetalhePage, title: 'Produto' }
  ```

- **`canActivate` / `canMatch` / `canDeactivate` / `resolve` ➝** guards e resolvers para controle de acesso, pré-carregamento de dados e lógica de navegação.

  ```ts
  import { authGuard } from './guards/auth.guard';
  import { pendingChangesGuard } from './guards/pending-changes.guard';
  import { perfilResolver } from './resolvers/perfil.resolver';

  {
    path: 'perfil/:id',
    component: PerfilPage,
    canMatch: [authGuard],                   // decide se a rota pode ser casada
    canActivate: [authGuard],                // decide se pode ativar
    canDeactivate: [pendingChangesGuard],    // impede sair com alterações não salvas
    resolve: { perfil: perfilResolver },     // carrega dados antes de entrar
    title: 'Perfil'
  }
  ```

---

#### 2. Componente raiz: (`src/app/app.html`)

Feita a limpeza ou edição desejada no HTML raiz, certifique incluir ao menos um outlet de rota (`<router-outlet />`) sem o qual nenhuma página mapeada pelas rotas será exibida:

```html
<!-- src/app/app.html -->
<router-outlet />
```

#### 3. Construção dos links de navegação

- Importe o `RouterLink` no coponente que ativará a navegação

```ts
// src/app/pages/page1/page1.ts
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router"; // importação

@Component({
  selector: "app-page1",
  imports: [RouterLink], // declaração que disponibiliza o RouterLink no template do componente
  templateUrl: "./page1.html",
  styleUrl: "./page1.css",
})
export class Page1 {}
```

- Contrua o link de navegação no template do componente que ativará a navegação

```html
<!-- src/app/pages/page1/page1.html -->
<p>page1 works!</p>
<button routerLink="page2">Ir para página 2</button>
<!-- 👆🏻 construção do link de navegação através de botão -->
```

### Boas práticas

- **Rotas semânticas**: nomes claros (ex.: `/contato`, `/produtos`).
- **Imports explícitos**: todo componente/diretiva/pipe usada no template deve estar em `imports` do componente standalone.
- **Toolbar enxuta**: mantenha apenas navegação; lógica de estado/usuário vai para serviços.
- **Acessibilidade**: use `<nav>` e `aria-current="page"` quando fizer sentido.

---

### Erros comuns (e como evitar)

- **Esquecer de importar `RouterOutlet` ou `RouterLink/RouterLinkActive`** no componente → a navegação não renderiza/estiliza.
- **Faltou registrar `routes`** em `app.config.ts` com `provideRouter(routes)` → o app não navega.
- **Falta de `exact` na home** → o link da home pode ficar sempre ativo em páginas filhas.

---

### Exemplo completo (componentes simples com estilização) [Aula 14]

1. Criados os componentes: `Home` e `Page1` na pasta **pages** e `Toolbar` na pasta **components** via comando:

   ```bash
   ng generate component pages/home && ng generate component pages/page1 && ng generate component components/toolbar
   ```

2. Registradas as rotas de navegação no arquivo `src/app/app.routes.ts`:

   ```ts
   // src/app/app.routes.ts
   import { Routes } from "@angular/router";
   import { Home } from "./pages/home/home";
   import { Page1 } from "./pages/page1/page1";

   export const routes: Routes = [
     { path: "", component: Home, pathMatch: "full" },
     { path: "page1", component: Page1 },
     { path: "**", redirectTo: "" },
   ];
   ```

3. Declarados **RouterOutlet** e **Toolbar** no componente raiz (`src/app/app.ts`):

   ```ts
   // src/app/app.ts
   import { Component } from "@angular/core";
   import { RouterOutlet } from "@angular/router";
   import { Toolbar } from "./components/toolbar/toolbar";

   @Component({
     selector: "app-root",
     imports: [RouterOutlet, Toolbar],
     templateUrl: "./app.html",
     styleUrl: "./app.scss",
   })
   export class App {}
   ```

4. Limpeza realizada em `src/app/app.html` e chamados os componentes _RouterOutlet_ e _Toolbar_:

   ```html
   <!-- src/app/app.html -->
   <app-toolbar />
   <router-outlet />
   ```

5. Construídos os templates das páginas `home` e `page1`:

   ```html
   <!-- src/app/pages/home/home.html -->
   <h1>Você está na página HOME</h1>
   ```

   ```html
   <!-- src/app/pages/page1/page1.html -->
   <h1>Você está na página 1</h1>
   ```

6. Importadas e utilizadas as diretivas de rota **RouterLink**, **RouterLinkActive** ao componente `Toolbar`

   ```ts
   // src/app/components/toolbar/toolbar.ts
   import { Component } from "@angular/core";
   import { RouterLink, RouterLinkActive } from "@angular/router";

   @Component({
     selector: "app-toolbar",
     imports: [RouterLink, RouterLinkActive],
     templateUrl: "./toolbar.html",
     styleUrl: "./toolbar.scss",
   })
   export class Toolbar {}
   ```

7. Definidos os estilos dos elementos no template Toolbar:

   ```scss
   // src/app/components/toolbar/toolbar.scss
   .toolbar_container {
     background-color: rgb(76, 76, 76);
     overflow: hidden;
     display: flex;
     justify-content: center;
   }

   .toolbar_container a {
     color: white;
     text-align: center;
     padding: 10px 15px;
     text-decoration: none;
     font-size: 18px;
   }

   .toolbar_container a:hover {
     background-color: rgb(134, 133, 66);
   }

   .toolbar_container a.active {
     background-color: white;
     color: black;
   }
   ```

8. Construídas os links de navegação no template Toolbar:

   ```html
   <!-- src/app/components/toolbar/toolbar.html -->
   <header>
     <div class="toolbar_container">
       <a
         routerLink=""
         routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }"
       >
         Página Inicial
       </a>
       <a routerLink="page1" routerLinkActive="active">Página 1</a>
     </div>
   </header>
   ```

> **Nota:**
>
> - **`routerLinkActive="active"`** adiciona a classe `active` quando o link corresponde à rota atual.
> - **`[routerLinkActiveOptions]="{ exact: true }"`** na home evita que `'/'` fique ativo quando você estiver em `/page1` ou `/page2`.

---

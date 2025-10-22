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
ng new minha-app --routing --style=scss

# rodar local
cd minha-app && ng serve -o

# gerar artefatos
ng g component shared/header
ng g service core/http/api

# checar versões
ng version
node -v && npm -v
```

---

## Execuções realizadas

- Conferi a versão do Angular CLI instalado com `ng version`.
- Criei projeto com `ng new <nome-do-app>` (ajuste o nome conforme seu caso) e rodei `ng serve -o` para validar o ambiente.

---

---

## Aula 07 - Ciclo de vida de componentes Angular

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

**1) `OnInit` + `OnChanges` com `@Input()`**

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

**2) Content vs View (`AfterContentInit` e `AfterViewInit`)**

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

**3) `DoCheck` (evite, a menos que precise)**

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

### Erros comuns (e como evitar) [Aula 07]

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

## Aula 08 — Tipos de Data Binding no Angular

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

## 1) Interpolação

- **Direção**: **somente leitura** da classe para o HTML.
- **Uso típico**: texto, atributos que aceitam _string_ no conteúdo (ex.: dentro de tags).

**Exemplo**:

```ts
// nome.ts
title = "Título desejado";
user = { name: "Ana", score: 42 };
```

```html
<!-- nome.html -->
<h1>{{ title }}</h1>
<p>Usuário: {{ user.name }} — Pontos: {{ user.score }}</p>
```

**Boas práticas**:

- Use o **operador de navegação segura** `{{ user?.name }}` quando algo pode ser nulo/indefinido.
- Evite expressões pesadas (chamar funções caras) dentro de `{{ ... }}`.

---

## 2) Property Binding

- **Direção**: classe → template, **em propriedades reais** do elemento/Componente/Directiva (não apenas atributos HTML).
- **Vantagem**: trabalha com **tipos** e recursos do DOM/Componentes (ex.: `[disabled]`, `[value]`, `[src]`, `[ngClass]`).

**Exemplo**:

```ts
// nome.ts
imgURL = "https://exemplo.com/imagem.png";
isDisabled = true;
```

```html
<!-- nome.html -->

<img [src]="imgURL" alt="Imagem" />
<button [disabled]="isDisabled">Enviar</button>
```

**Dicas**:

- Para **atributos** específicos (ex.: `aria-label`): use **attribute binding** → `[attr.aria-label]="rotulo"`.
- Para **classes/estilos**: `[class.nome]="condicao"`, `[style.width.px]="largura"`.

---

## 3) Event Binding

- **Direção**: template → classe (o template **emite** um evento para o TS reagir).
- **Uso típico**: cliques, teclas, mudanças de valor, eventos custom de componentes.

**Exemplo**:

```ts
// nome.ts
chamarFuncao() {
// ação a executar quando o botão for clicado
}
```

```html
<!-- nome.html -->

<button (click)="chamarFuncao()">Acionar</button>
```

**Dicas**:

- Eventos do DOM: `(click)`, `(input)`, `(keyup.enter)`, etc.
- Componentes filhos podem emitir eventos próprios com `@Output()` → você consome com `(evento)="..."`.

---

## 4) Two-Way Data Binding (Template-driven)

- **Direção**: **mão dupla** (classe ↔ template).
- **Requisito**: **FormsModule**. Em projetos **standalone**, importe no **componente** (ou em providers via `importProvidersFrom`).

**Exemplo (standalone component)**:

```ts
// nome.ts
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
<!-- nome.html -->

<input [(ngModel)]="title" placeholder="Digite o título" />

<p>Valor atual: {{ title }}</p>
```

**Observações importantes**:

- O “**banana in a box**” `[( ... )]` é literalmente **property + event** sob o capô.
- Em formulários com **Reactive Forms**, use **FormControl/ControlName** (não misture com `ngModel` no mesmo controle).
- Para formularios maiores/complexos, prefira **Reactive Forms** (mais previsíveis e testáveis).

---

## Escolhas e equivalências úteis

- `[value]="prop"` + `(input)="prop = $event.target.value"` **≈** `[(ngModel)]="prop"` (mas `ngModel` exige **FormsModule**).
- `[src]` **vs** atributo `src`: o binding usa **propriedade** do elemento (aplica tipos/validação do DOM).
- Segurança: Angular **sanitiza** bindings em URLs/HTML; para casos especiais, use `DomSanitizer` (com cautela!).

---

## Erros comuns (e como evitar) [Aula 08]

- **Esquecer de importar FormsModule** → `[(ngModel)]` não funciona.
- **Funções caras** em interpolação/bindings → _jank_ de performance (prefira getters/sinais ou pré-computar).
- **Misturar ngModel com Reactive Forms** no mesmo controle → conflitos e avisos.
- **Confundir atributo com propriedade**: para bindings, use **propriedade** (`[disabled]`, `[value]`, `[src]`).

---

## Exemplos resumidos

**1) Interpolação**:

```ts
// nome.ts
title = "titulo desejado";
```

```html
<!-- nome.html -->
<h1>{{ title }}</h1>
```

**2) Property binding**:

```ts
// nome.ts
imgURL = "link/endereco-da-imagem";
```

```html
<!-- nome.html -->
<img [src]="imgURL" />
```

**3) Event binding**:

```ts
// nome.ts
chamarFuncao() {}
```

```html
<!-- nome.html -->
<button (click)="chamarFuncao()">Clique</button>
```

**4) Two-way data binding**:

```ts
// nome.ts (standalone)
import { FormsModule } from "@angular/forms";
imports: [FormsModule];
title = "titulo desejado";
```

```html
<!-- nome.html -->
<input [(ngModel)]="title" />
```

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

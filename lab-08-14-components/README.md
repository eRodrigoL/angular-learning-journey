# lab-08-14-components

Laboratório prático cobrindo tópicos das aulas **08 a 14** do repositório **ANGULAR-LEARNING-JOURNEY**.

## Objetivos

- **Aula 08** — Exercitar ciclo de vida de componentes (hooks e boas práticas).
- **Aula 09** — Praticar data bindings: interpolação, property, event e two-way.
- **Aulas 10 e 11** — Usar o novo **control flow**: `@if`, `@switch`, `@for` (com `@empty` e `track`).
- **Aulas 12 e 13** — Implementar e usar **pipes**, incluindo pipe customizada.
- **Aula 14** — Criar componentes e adicionar navegação básica com **Router**.

> Referência de estudo: [./STUDY-NOTES.md](./STUDY-NOTES.md)

---

## Development server

Para iniciar o servidor de desenvolvimento local:

```bash
ng serve -o
```

A opção `-o` abre automaticamente `http://localhost:4200/` no navegador padrão
A aplicação recarrega automaticamente ao salvar arquivos do projeto.

---

## Code scaffolding (Angular CLI)

A CLI do Angular oferece geradores (_schematics_). Exemplos:

**Component**:

```bash
ng generate component shared/header
```

**Directive**:

```bash
ng generate directive shared/auto-focus
```

**Pipe**:

```bash
ng generate pipe shared/currency-br
```

**Service**:

```bash
ng generate service core/http/api
```

Lista completa de opções e artefatos:

```bash
ng generate --help
```

---

## Estrutura sugerida (didática)

```text
src/
└─ app/
   ├─ core/                 # providers globais, http/interceptors, guards
   ├─ shared/               # componentes/pipes/diretivas reutilizáveis
   └─ features/
      ├─ lifecycle/         # Aula 08
      ├─ bindings/          # Aula 09
      ├─ control-flow/      # Aulas 10 e 11
      ├─ pipes/             # Aulas 12 e 13
      └─ navigation/        # Aula 14
```

> Observação: nomes e pastas podem ser ajustados conforme o exercício evoluir.

---

## Ambiente

Versões observadas ao criar este laboratório (podem variar no seu ambiente):

```text
Angular CLI: 20.3.7
Node: 22.14.0
Package Manager: npm 10.9.2
OS: win32 x64

Angular: 20.3.7
rxjs: 7.8.2
typescript: 5.9.3
zone.js: 0.15.1
```

---

## Scripts úteis (atalhos)

**Conferir versão**:

```bash
ng version
```

**Rodar com abertura automática do navegador**:

```bash
ng serve -o
```

---

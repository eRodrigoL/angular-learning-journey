# REPOSITÓRIO DE APRENDIZAGEM

Repositório criado para absorver o conteúdo do curso [Curso Angular (v19)](https://www.udemy.com/course/curso-angular-15/?couponCode=MT251020G3), ministrado pelo professor Alexandre da Silva Ribeiro.

---

## Organização do Conteúdo

Além deste arquivo README.md explicando o repositório, há também o arquivo [**STUDY-NOTES.md**](STUDY-NOTES.md) trazendo, de forma didática, o conteúdo de cada aula mesclado com conhecimentos externos.  
Os projetos desenvolvidos ao longo deste estudo estão separados por pastas, devidamente nomeadas.

---

## Documentação Angular

Documentação oficial: [Angular.dev — Overview](https://angular.dev/overview)

---

## Extensões Indicadas no Curso

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Angular Snippets (Version 18) — John Papa](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Angular 17 Snippets — TypeScript, HTML, Angular Material, NgRx, RxJS & Flex Layout (BeastCode)](https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode)

---

## Comandos Úteis

- Instalar a versão mais recente do Angular CLI:

  ```bash
  npm install -g @angular/cli
  ```

  > Para instalar uma versão específica, acrescente `@<versão>` (ex.: `npm i -g @angular/cli@20.3.6`).

- Mostrar versões do Angular CLI e dependências relevantes do projeto:

  ```bash
  ng version
  ```

- Criar projeto Angular:

  ```bash
  ng new <nome-do-app> --style=scss --skip-git
  ```

  > **`--style=scss`** → define **SCSS** como linguagem de estilos padrão (novos componentes usarão `.scss`; o arquivo global será `src/styles.scss`).
  > **`--skip-git`** → não executa `git init` no diretório do projeto (cada projeto aqui dentro **não** precisa de `git init`, pois a **raiz do repositório** que reúne todos os projetos já possui a pasta `.git`).
  >
  > Comando padrão para inicialização de um projeto → `ng new <nome-do-app>`

- Iniciar o servidor de desenvolvimento do Angular (por padrão em `http://localhost:4200`):

  ```bash
  ng serve -o
  ```

  > A opção (flag) **`-o`**/**`--open`** abre automaticamente o navegador na URL do dev server assim que a aplicação terminar de compilar.
  >
  > Sem **`-o`**, é necessário abrir manualmente o navegador em `http://localhost:4200` após a compilação inicial.

---

## Sumário

- [NOTAS DE APRENDIZAGEM](./STUDY-NOTES.md#notas-de-aprendizagem)
  - [Aula 01 — Boas-vindas](./STUDY-NOTES.md#aula-01---boas-vindas)
  - [Aula 02 — O que é SPA e o que é Angular](./STUDY-NOTES.md#aula-02---o-que-é-spa-e-o-que-é-angular)
  - [Aula 03 — Documentação Angular](./STUDY-NOTES.md#aula-03---documentação-angular)
  - [Aula 04 — Setup de um projeto](./STUDY-NOTES.md#aula-04---setup-de-um-projeto)
    - [Pré-requisitos](./STUDY-NOTES.md#aula-04---setup-de-um-projeto)
    - [Instalar Angular CLI](./STUDY-NOTES.md#aula-04---setup-de-um-projeto)
    - [Criar projeto](./STUDY-NOTES.md#aula-04---setup-de-um-projeto)
    - [Rodar projeto](./STUDY-NOTES.md#aula-04---setup-de-um-projeto)
  - [Aula 05 — Anatomia de uma App Angular ()](./STUDY-NOTES.md#aula-05---anatomia-de-uma-app-angular)
    - [Árvore inicial do projeto](./STUDY-NOTES.md#aula-05---anatomia-de-uma-app-angular)
    - [Conceitos-chave no Angular 20](./STUDY-NOTES.md#aula-05---anatomia-de-uma-app-angular)
    - [Boas práticas de layout](./STUDY-NOTES.md#aula-05---anatomia-de-uma-app-angular)
  - [Aula 06 — Extensões VS Code úteis ()](./STUDY-NOTES.md#aula-06---extensões-vs-code-úteis)
    - [Comandos rápidos](./STUDY-NOTES.md#aula-06---extensões-vs-code-úteis)
    - [Execuções realizadas](./STUDY-NOTES.md#aula-06---extensões-vs-code-úteis)
  - [Aula 07 — O que são Componentes no Angular](./STUDY-NOTES.md#aula-07--—-o-que-são-componentes-no-angular)
    - [Geração de componente (CLI)](./STUDY-NOTES.md#aula-07--—-o-que-são-componentes-no-angular)
    - [Estrutura gerada](./STUDY-NOTES.md#aula-07--—-o-que-são-componentes-no-angular)
    - [Uso em componente pai/filho](./STUDY-NOTES.md#aula-07--—-o-que-são-componentes-no-angular)
    - [Boas práticas](./STUDY-NOTES.md#aula-07--—-o-que-são-componentes-no-angular)
    - [Nota sobre nomes curtos no Angular 20](./STUDY-NOTES.md#aula-07--—-o-que-são-componentes-no-angular)
  - [Aula 08 — Ciclo de vida de componentes Angular](./STUDY-NOTES.md#aula-08---ciclo-de-vida-de-componentes-angular)
    - [Ordem de execução](./STUDY-NOTES.md##aula-08---ciclo-de-vida-de-componentes-angular)
    - [Quando usar cada hook](./STUDY-NOTES.md#aula-08---ciclo-de-vida-de-componentes-angular)
    - [Exemplos práticos](./STUDY-NOTES.md#aula-08---ciclo-de-vida-de-componentes-angular)
    - [Evitar vazamento de memória](./STUDY-NOTES.md#aula-08---ciclo-de-vida-de-componentes-angular)
    - [Erros comuns e checklist](./STUDY-NOTES.md#aula-08---ciclo-de-vida-de-componentes-angular)
  - [Aula 09 — Tipos de Data Binding](./STUDY-NOTES.md#aula-09-—-tipos-de-data-binding-no-angular)
    - [Interpolação](./STUDY-NOTES.md#aula-09-—-tipos-de-data-binding-no-angular)
    - [Property binding](./STUDY-NOTES.md#aula-09-—-tipos-de-data-binding-no-angular)
    - [Event binding](./STUDY-NOTES.md#aula-09-—-tipos-de-data-binding-no-angular)
    - [Two-way data binding](./STUDY-NOTES.md#aula-09-—-tipos-de-data-binding-no-angular)
    - [Erros comuns](./STUDY-NOTES.md#aula-09-—-tipos-de-data-binding-no-angular)
  - [Aula 10 — Diretivas de decisão @if e @switch](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
    - [Por que usar](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
    - [@if com @else/@else if](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
    - [@switch com @case/@default](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
    - [Mapeamentos 1:1 (antigo → novo)](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
    - [Boas práticas e erros comuns](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
    - [Exemplo completo](./STUDY-NOTES.md#aula-10-—-diretivas-de-decisão-@if-e-@switch)
  - [Aula 11 — Diretiva estrutural @for](./STUDY-NOTES.md#aula-11-—-diretivas-estruturais-@for)
    - [Iteração, @empty e track](./STUDY-NOTES.md#aula-11-—-diretivas-estruturais-@for)
    - [Mapeamentos 1:1](./STUDY-NOTES.md#aula-11-—-diretivas-estruturais-@for)
    - [Boas práticas e erros comuns](./STUDY-NOTES.md#aula-11-—-diretivas-estruturais-@for)
    - [Exemplo completo](./STUDY-NOTES.md#aula-11-—-diretivas-estruturais-@for)
  - [Aula 13 — Pipes customizadas](./STUDY-NOTES.md#aula-13-—-criando-pipes-customizadas)
    - [Gerar pipe (CLI)](./STUDY-NOTES.md#aula-13-—-criando-pipes-customizadas)
    - [Exemplo: pipe sexo](./STUDY-NOTES.md#aula-13-—-criando-pipes-customizadas)
    - [Boas práticas, erros comuns e variação com opções](./STUDY-NOTES.md#aula-13-—-criando-pipes-customizadas)
  - [Aula 14 — Criar componentes e adicionar navegação](./STUDY-NOTES.md##aula-14-—-criando-componentes-e-adicionando-navegação)
    - [Importância das rotas](./STUDY-NOTES.md#aula-14-—-criando-componentes-e-adicionando-navegação)
    - [Por que usar routerLink](./STUDY-NOTES.md#aula-14-—-criando-componentes-e-adicionando-navegação)
    - [Passo a passo: rotas, outlet e links](./STUDY-NOTES.md#aula-14-—-criando-componentes-e-adicionando-navegação)
    - [Boas práticas, erros comuns e exemplo completo](./STUDY-NOTES.md#aula-14-—-criando-componentes-e-adicionando-navegação)

---

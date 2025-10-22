# REPOSITÓRIO DE APRENDIZAGEM

Repositório criado para absorver o conteúdo do curso [Curso Angular (v19)](https://www.udemy.com/course/curso-angular-15/?couponCode=MT251020G3), ministrado pelo professor Alexandre da Silva Ribeiro.

## Organização do Conteúdo

Além deste arquivo README.md explicando o repositório, há também o arquivo [**STUDY-NOTES.md**](STUDY-NOTES.md) trazendo, de forma didática, o conteúdo de cada aula mesclado com conhecimentos externos.  
Os projetos desenvolvidos ao longo deste estudo estão separados por pastas, devidamente nomeadas.

## Comandos Úteis

Instalar a versão mais recente do Angular CLI:

```bash
npm install -g @angular/cli
```

- Para instalar uma versão específica, acrescente `@<versão>` (ex.: `npm i -g @angular/cli@20.3.6`).

Mostrar versões do Angular CLI e dependências relevantes do projeto:

```bash
ng version
```

Criar projeto Angular:

```bash
ng new <nome-do-app> --style=scss --skip-git
```

- **`--style=scss`** → define **SCSS** como linguagem de estilos padrão (novos componentes usarão `.scss`; o arquivo global será `src/styles.scss`).
- **`--skip-git`** → não executa `git init` no diretório do projeto (cada projeto aqui dentro **não** precisa de `git init`, pois a **raiz do repositório** que reúne todos os projetos já possui a pasta `.git`).

> Comando padrão para inicialização de projeto → `ng new <nome-do-app>`

Iniciar o servidor de desenvolvimento do Angular (por padrão em `http://localhost:4200`):

```bash
ng serve
```

- A opção (flag) **`-o`**/**`--open`** abre automaticamente o navegador na URL do dev server assim que a aplicação terminar de compilar:

```bash
ng serve -o
```

- Sem **`-o`**, é necessário abrir manualmente o navegador em `http://localhost:4200` após a compilação inicial.

## Documentação Angular

Documentação oficial: [Angular.dev — Overview](https://angular.dev/overview)

## Extensões Indicadas no Curso

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Angular Snippets (Version 18) — John Papa](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Angular 17 Snippets — TypeScript, HTML, Angular Material, NgRx, RxJS & Flex Layout (BeastCode)](https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode)

---

> ### NOTA IMPORTANTE 1
>
> Ao trabalhar em múltiplos projetos dentro de um mesmo repositório, a estratégia de usar **`--skip-git`** em cada `ng new` evita repositórios Git aninhados. Inicialize o Git apenas na raiz.

.

> ### NOTA IMPORTANTE 2
>
> Trabalhar neste repositório exige atenção a **onde** cada comando é executado.  
> Exemplo: para iniciar o servidor de desenvolvimento, é necessário estar na **raiz do projeto desejado** (e não na raiz do repositório).  
> Já para criar um **novo projeto**, esteja na **raiz do repositório**, a fim de não criar um projeto dentro de outro.

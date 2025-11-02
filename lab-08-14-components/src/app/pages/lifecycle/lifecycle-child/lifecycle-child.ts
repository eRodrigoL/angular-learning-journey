// src/app/pages/lifecycle/lifecycle-child/lifecycle-child.ts
// -------------------------------------------------------------------------------------------------
// CHILD (filho) moderno com SIGNAL INPUTS
//
// Objetivo didático:
// - Mostrar o ciclo de vida moderno com inputs baseados em signals (input()/input.required())
// - Reagir a alterações de "inputs" via effect(), ao invés de ngOnChanges()
// - Demonstrar projeção de conteúdo (Content*) e acesso à view (View*)
// - Mostrar por que *Checked e DoCheck devem evitar lógica pesada (logs só no console)
//
// Observações importantes:
// 1) "input()" define um signal que recebe valor do pai.
//    - "input.required<T>()" obriga o pai a passar o valor (sem default), útil p/ didática.
//    - "input<T>(default)" define default e o pai pode ou não sobrescrever.
// 2) Para reagir às mudanças, usamos "effect(() => { ... })" — é o substituto moderno do ngOnChanges.
// 3) Hooks *Checked (AfterContentChecked/AfterViewChecked) podem disparar MUITAS vezes.
//    Mantemos logs APENAS no console para evitar loop de mudança de estado na UI.
// 4) Em onDestroy fazemos limpeza de listeners/recursos nativos criados em AfterViewInit.
// -------------------------------------------------------------------------------------------------

import { JsonPipe } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  ContentChild,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  DestroyRef,
  inject,
  input, // <-- moderno: signal input
  effect, // <-- moderno: reagir a mudanças dos inputs
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-child',
  imports: [JsonPipe],
  templateUrl: './lifecycle-child.html',
  styleUrls: ['./lifecycle-child.scss'],
})
export class LifecycleChild
  implements
    OnInit,
    OnDestroy,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  // ------------------------- SIGNAL INPUTS (MODERNO) -------------------------
  // - "required" para reforçar didática: o pai DEVE fornecer os valores.
  // - No template do filho, acessamos com this.*Input().
  // - Não existe ngOnChanges aqui; reagimos com effect() no ngOnInit.

  title = input.required<string>(); // título fornecido pelo pai (sem valor padrão)
  settings = input.required<{ theme: 'light' | 'dark'; counter: number }>();
  projectedLabel = input<string>('(sem label projetado)'); // exemplo com default

  // ------------------------- QUERIES -------------------------
  // Conteúdo PROJETADO (vem de fora do componente, via <ng-content>):
  @ContentChild('projectedMarker') projectedEl?: ElementRef<HTMLElement>;

  // Elemento da PRÓPRIA VIEW do componente (DOM do template do filho):
  @ViewChild('actionBtn') actionBtn?: ElementRef<HTMLButtonElement>;

  // ------------------------- SAÍDA PARA O PAI -------------------------
  // Eventos "relevantes" são emitidos para o pai (ex.: sequência inicial, cliques, montagens)
  @Output() eventLog = new EventEmitter<string>();

  // ------------------------- INFRA DE LIMPEZA -------------------------
  private destroyRef = inject(DestroyRef);

  // ------------------------- CONSTRUCTOR -------------------------
  // Use para DI e estado leve. Não acesse DOM nem valores de inputs aqui.
  constructor() {
    this.uiLog('constructor'); // console apenas, sem emitir para o pai
  }

  // ------------------------- HOOKS -------------------------

  ngOnInit(): void {
    // Momento ideal para inicializações que podem depender de DI,
    // e para "registrar" effects que reagem a mudanças de signal inputs.

    this.emitAndLog('ngOnInit');

    // Reage ao título vindo do pai (via signal input)
    effect(
      () => {
        const v = this.title(); // lê o valor atual do signal input
        this.emitAndLog(`effect(title): mudou → ${v}`);
      },
      { injector: this.destroyRef as any }
    );

    // Reage a trocas de referência do objeto settings
    // (Obs.: se o pai MUTAR a mesma ref, este effect não roda; é didático!)
    effect(
      () => {
        const s = this.settings(); // ler o objeto (reativo por referência)
        this.emitAndLog(`effect(settings): nova referência → ${JSON.stringify(s)}`);
      },
      { injector: this.destroyRef as any }
    );
  }

  ngAfterContentInit(): void {
    // Conteúdo projetado está disponível
    this.emitAndLog('ngAfterContentInit');

    // Exemplo: ler o texto projetado (didático)
    const text = this.projectedEl?.nativeElement.textContent?.trim();
    if (text) {
      this.emitAndLog(`ngAfterContentInit: conteúdo projetado → "${text}"`);
    }
  }

  ngAfterContentChecked(): void {
    // Pode rodar em TODO ciclo de verificação: mantenha leve!
    this.uiLog('ngAfterContentChecked'); // console somente
  }

  ngAfterViewInit(): void {
    // View do componente está montada; @ViewChild disponível
    this.emitAndLog('ngAfterViewInit');

    // Ex.: adiciona listener nativo (lembrar de remover em onDestroy)
    if (this.actionBtn?.nativeElement) {
      this.actionBtn.nativeElement.addEventListener('click', this.onActionClick);
      this.emitAndLog('ngAfterViewInit: listener adicionado ao botão da View');
    }
  }

  ngAfterViewChecked(): void {
    // Também pode rodar com frequência; evitar lógica custosa
    this.uiLog('ngAfterViewChecked'); // console somente
  }

  ngDoCheck(): void {
    // Hook de detecção customizada (use raramente).
    // Mantemos aqui para mostrar que ele acontece, mas sem custo.
    this.uiLog('ngDoCheck'); // console somente
  }

  ngOnDestroy(): void {
    // Limpeza de recursos (listeners, intervals, observers, etc.)
    if (this.actionBtn?.nativeElement) {
      this.actionBtn.nativeElement.removeEventListener('click', this.onActionClick);
      this.emitAndLog('ngOnDestroy: listener removido do botão da View');
    }
    this.emitAndLog('ngOnDestroy');
  }

  // ------------------------- AUXILIARES -------------------------

  // Listener para o botão da view (ex.: exemplo de ação do usuário)
  private onActionClick = () => {
    this.emitAndLog('ViewChild button: click!');
  };

  // Emite para o pai E loga no console — para eventos "importantes"
  private emitAndLog(msg: string) {
    const line = `Filho: ${msg}`;
    console.log(line);
    this.eventLog.emit(line);
  }

  // Loga só no console — para eventos muito frequentes (*Checked / DoCheck)
  private uiLog(msg: string) {
    console.log(`Filho: ${msg}`);
  }
}

// -------------------------------------------------------------------------------------------------
// VISÃO RÁPIDA da linha do tempo de um componente — o que acontece e como observar
//
// 1) constructor()
//    - Quando ocorre: na criação da classe (antes de qualquer template/inputs).
//    - O que fazer: DI e estado leve; NÃO acessar DOM nem inputs.
//    - Como observar no exemplo: mensagem no console via uiLog('constructor').
//    - Como disparar: montar o filho (página /lifecycle carregada e showChild === true).
//
// 2) ngOnInit()
//    - Quando ocorre: após a injeção e a primeira avaliação de inputs/signals.
//    - O que fazer: inicialização real (registrar effects, timers, subscriptions com limpeza).
//    - Como observar: emitAndLog('ngOnInit') → aparece no Log do pai e no console.
//    - Como disparar: ao montar o filho (entrar na rota, ou clicar “Adicionar filho”).
//
// 3) effect() sobre signal inputs (substitui ngOnChanges)
//    - Quando ocorre: sempre que o valor do signal lido dentro do effect mudar.
//    - O que fazer: reagir a mudanças de inputs modernos (input()/input.required()).
//    - Como observar:
//       • effect(title): clique “Atualizar input() (title)” no PAI → aparece no Log do pai.
//       • effect(settings): só dispara quando TROCA a referência do objeto settings no PAI.
//    - Como disparar no PAI:
//       • “Atualizar input() (title)” → titleSig.update(...).
//       • “Substituir objeto settings (novo ref)” → settingsSig.update(...) (nova referência).
//       • “Mutar objeto (shallow)” NÃO dispara effect(settings) (mesma referência).
//
// 4) ngAfterContentInit()
//    - Quando ocorre: após projeção de conteúdo (<ng-content>) ser resolvida.
//    - O que fazer: interagir com conteúdo projetado (@ContentChild/@ContentChildren).
//    - Como observar: emitAndLog('ngAfterContentInit') e leitura do texto projetado.
//    - Como disparar: manter o filho montado com o <span projected #projectedMarker> do PAI.
//
// 5) ngAfterContentChecked()
//    - Quando ocorre: em TODO ciclo de verificação, após o Content ter sido verificado.
//    - O que fazer: manter leve; evitar lógica pesada.
//    - Como observar: apenas console via uiLog('ngAfterContentChecked').
//    - Como disparar: qualquer mudança que dispare CD (ex.: clicar botões do PAI).
//
// 6) ngAfterViewInit()
//    - Quando ocorre: quando a VIEW do componente está pronta; @ViewChild resolvido.
//    - O que fazer: acessar elementos do template, integrar libs que dependem do DOM.
//    - Como observar: emitAndLog('ngAfterViewInit'), e adicionamos listener no botão.
//    - Como disparar: montar o filho. Clique no botão do Filho para ver “ViewChild button: click!”.
//
// 7) ngAfterViewChecked()
//    - Quando ocorre: em TODO ciclo de verificação, após a VIEW ser verificada.
//    - O que fazer: manter leve; logs só no console para não criar loops.
//    - Como observar: console via uiLog('ngAfterViewChecked').
//    - Como disparar: qualquer ação que gere CD (ex.: alterar signals no PAI).
//
// 8) ngDoCheck()
//    - Quando ocorre: em TODO ciclo de verificação (hook de detecção customizada).
//    - O que fazer: usar raramente; caro. Aqui apenas logamos no console.
//    - Como observar: console via uiLog('ngDoCheck').
//    - Como disparar: interações que causam CD (botões do PAI/Filho).
//
// 9) ngOnDestroy()
//    - Quando ocorre: antes do componente ser removido.
//    - O que fazer: LIMPAR tudo que foi criado manualmente (listeners, intervals, observers…).
//    - Como observar: emitAndLog('ngOnDestroy') e “listener removido” no Log do pai.
//    - Como disparar: clicar “Remover filho” no PAI.
// -------------------------------------------------------------------------------------------------
//
// MAPA DE GATILHOS (o que clicar e o que esperar)
//
// • “Adicionar/Remover filho” (PAI):
//    - Monta/Desmonta o Filho → constructor → ngOnInit → ... → ngOnDestroy.
// • “Atualizar input() (title)” (PAI):
//    - Altera titleSig → effect(title) no Filho é disparado.
// • “Mutar objeto (shallow) settings.counter++” (PAI):
//    - Mesma referência → effect(settings) NÃO dispara (didático).
// • “Substituir objeto settings (novo ref)” (PAI):
//    - Nova referência → effect(settings) dispara no Filho.
// • Clique no botão do FILHO (“Botão da View”):
//    - Dispara handler do @ViewChild → “ViewChild button: click!” (emitAndLog).
//
// REGRAS DE OURO (para não entrar em loop e manter performance)
//
// • Não emita eventos para o PAI dentro de *Checked/DoCheck (rodam com altíssima frequência).
// • Use effect() para reagir a signal inputs (moderno) ao invés de ngOnChanges.
// • Tudo que for criado manualmente (listeners, intervals) deve ser limpo em ngOnDestroy.
// -------------------------------------------------------------------------------------------------

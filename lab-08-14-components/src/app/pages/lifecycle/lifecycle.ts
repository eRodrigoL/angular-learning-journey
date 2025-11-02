// src/app/pages/lifecycle/lifecycle.ts
// -------------------------------------------------------------------------------------------------
// PARENT (pai) moderno
//
// Objetivo didático:
// - Fornecer "inputs" ao filho usando signals no PAI e signal inputs no FILHO
// - Mostrar diferença entre mutar um objeto (mesma ref) x substituir a referência
// - Registrar um log visual no pai APENAS para eventos importantes emitidos pelo filho
//
// Boas práticas demonstradas:
// - Usar signals no pai para estado de UI (showChild, title, settings, projectedLabel)
// - Evitar emitir logs nos *Checked para não causar loops de CD
// - Usar aria-live no log para melhor A11y
// -------------------------------------------------------------------------------------------------

import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { LifecycleChild } from './lifecycle-child/lifecycle-child';

@Component({
  selector: 'app-lifecycle',
  imports: [FormsModule, JsonPipe, LifecycleChild],
  templateUrl: './lifecycle.html',
  styleUrls: ['./lifecycle.scss'],
})
export class Lifecycle {
  // Controle de renderização do filho
  showChild = signal(true);

  // Inputs modernos que serão passados para o filho (todos signals no pai):
  titleSig = signal('Título inicial (signal input)');
  settingsSig = signal<{ theme: 'light' | 'dark'; counter: number }>({
    theme: 'light',
    counter: 0,
  });
  projectedLabelSig = signal('Conteúdo projetado do Pai');

  // Log visual do pai (somente eventos "importantes" vindos do filho)
  logs = signal<string[]>([]);

  constructor() {
    // Exemplo: reagir no pai a alterações de settingsSig (apenas console)
    effect(() => {
      const s = this.settingsSig();
      console.debug('Pai: settings mudou (effect)', s);
    });
  }

  // Alterna a montagem do filho (didático para ver ngOnDestroy)
  toggleChild() {
    this.showChild.update((v) => !v);
    this.pushLog(`Pai: toggled child → ${this.showChild() ? 'MOSTRAR' : 'ESCONDER'}`);
  }

  // Altera o signal que alimenta o input "title" do filho
  bumpTitle() {
    this.titleSig.update((v) => v + ' • ' + new Date().toLocaleTimeString());
    this.pushLog('Pai: alterou title (signal input) → filho reage por effect');
  }

  // MUTAR o mesmo objeto (mesma referência) → effects por referência NÃO disparam no filho
  mutateSettingsShallow() {
    const ref = this.settingsSig();
    ref.counter++; // mutação (didática; evitar em produção)
    this.settingsSig.set(ref); // mesma ref — efeito por referência no filho NÃO roda
    this.pushLog('Pai: mutou settings.counter no mesmo objeto (sem trocar referência)');
  }

  // SUBSTITUIR a referência → effect por referência dispara no filho
  replaceSettingsObject() {
    this.settingsSig.update((s) => ({
      ...s,
      counter: s.counter + 1,
      theme: s.theme === 'light' ? 'dark' : 'light',
    }));
    this.pushLog('Pai: substituiu objeto settings (nova referência) → effect do filho dispara');
  }

  clearLog() {
    this.logs.set([]);
  }

  // Recebe eventos do filho e acrescenta ao log visual
  pushLog(msg: string) {
    console.log(msg);
    this.logs.update((list) => [...list, msg]);
  }
}

// -------------------------------------------------------------------------------------------------
// VISÃO RÁPIDA (linha do tempo) — PAI: o que acontece e como observar
//
// 1) constructor()
//    - Quando ocorre: ao criar a instância do componente PAI.
//    - O que fazer: DI e estado leve; configurar sinais iniciais (showChild, titleSig, settingsSig).
//    - Como observar: código inicial define os signals; logs de debug opcionais no console.
//
// 2) effect() no PAI (observa settingsSig)
//    - Quando ocorre: toda vez que settingsSig TROCAR de referência (set/update criando novo objeto).
//    - O que fazer: instrumentação/telemetria leve ou side-effects inofensivos (apenas console aqui).
//    - Como observar: abra o console e veja “Pai: settings mudou (effect)”.
//
// 3) Interações do usuário (botões) → disparam mudanças de estado
//    - toggleChild(): alterna montagem do Filho → útil para ver ngOnInit/ngOnDestroy no Filho.
//    - bumpTitle(): altera titleSig (string) → filho reage com effect(title).
//    - mutateSettingsShallow(): muta o MESMO objeto (mesma referência) → filho NÃO percebe por ref.
//    - replaceSettingsObject(): cria NOVO objeto (nova referência) → filho percebe (effect(settings)).
//    - clearLog(): limpa o log visual do PAI (não afeta o ciclo do Filho).
//
// 4) Recebendo eventos do Filho
//    - pushLog(msg): assina o Output (eventLog) do Filho e adiciona a entrada no log visual.
//    - O que é registrado: apenas eventos “importantes” (montagem, efeitos, cliques).
//    - Por que não todos? Hooks *Checked/DoCheck rodam muito → mantemos só no console do Filho.
//
// MAPA DE GATILHOS (o que clicar e o que esperar)
//
// • “Adicionar/Remover filho”:
//    - Mostra/oculta o <app-lifecycle-child> → observe no Log do PAI: ngOnInit/ngOnDestroy (emitidos pelo Filho).
// • “Atualizar input() (title)”:
//    - Atualiza titleSig → observe no Log do PAI: effect(title) emitido pelo Filho.
// • “Mutar objeto (shallow)”:
//    - Mesmo objeto, valores mudam → filho NÃO emite effect(settings) (didático).
// • “Substituir objeto settings (novo ref)”:
//    - Nova referência → filho emite effect(settings) → aparece no Log do PAI.
// • Clique no botão do FILHO (“Botão da View”):
//    - Filho emite “ViewChild button: click!” → aparece no Log do PAI.
//
// REGRAS DE OURO
//
// • No PAI, evite side-effects pesados dentro de effects (mantenha console/telemetria leve).
// • Prefira substituir objetos (imutabilidade) quando quiser notificar consumidores por referência.
// • O Log do PAI deve registrar “eventos didáticos” — não spammar com *Checked/DoCheck.
// • Use aria-live="polite" no contêiner de log para acessibilidade.
// -------------------------------------------------------------------------------------------------

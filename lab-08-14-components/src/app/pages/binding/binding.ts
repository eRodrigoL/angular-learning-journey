// src/app/pages/binding/binding.ts
// -------------------------------------------------------------------------------------------------
// PÁGINA: Binding Demo (Aula 09) — Standalone + Signals
//
// Cenário realista: “Configurar produto”
// - O filho expõe um formulário moderno (Signals + model()) para editar o produto.
// - O pai exibe um “card de preview” do produto e reage a cliques (event binding).
// - Interpolação mostra dados no template.
// - Property binding controla disable/estilo/atributos.
// - Two-way:
//   • Moderno: [(product)] com model<Product>() no FILHO (sem @Output manual).
//   • Clássico (comparação): [(ngModel)] para um campo simples (ex.: cupom de desconto).
//
// Observações de aula:
// - Interpolação: {{ ... }} (classe → template)
// - Property binding: [prop]="expr" (classe → template; propriedades reais do DOM/Componentes)
// - Event binding: (evento)="handler(...)" (template → classe)
// - Two-way: [(...)] = property + event sob o capô.
// -------------------------------------------------------------------------------------------------

import { Component, signal, computed, effect } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // para o exemplo clássico com [(ngModel)]
import { BindingChild, Product } from './binding-child/binding-child';

@Component({
  selector: 'app-binding',
  imports: [DecimalPipe, FormsModule, BindingChild],
  templateUrl: './binding.html',
  styleUrl: './binding.scss',
})
export class Binding {
  // ----------------------- Estado principal (Signals) -----------------------
  // “productSig” é a fonte de verdade do produto (nome, preço, estoque).
  productSig = signal<Product>({
    name: 'Headset Gamer X300',
    price: 349.9,
    stock: 12,
    imageUrl: 'https://placehold.co/320x180?text=Headset+X300',
    featured: false,
  });

  // Ex.: atributo calculado (aparece no card via interpolação/property binding)
  canBuySig = computed(() => this.productSig().stock > 0);

  // Ex.: estilo responsivo do card (property binding em [style.width.px])
  cardWidthPxSig = signal(320);

  // Ex.: “carrinho” para reagir a (click) no botão “Comprar”
  cartCountSig = signal(0);

  // ----------------------- Two-way clássico (comparação) -------------------
  // Somente para demonstrar [(ngModel)] ao lado do moderno:
  coupon = '';

  // ----------------------- Handlers (event binding) ------------------------
  onBuyClick() {
    // Reage a (click) → template → classe
    if (!this.canBuySig()) return;
    this.cartCountSig.update((n) => n + 1);
    // desconta 1 no estoque para refletir efeito real
    this.productSig.update((p) => ({ ...p, stock: Math.max(p.stock - 1, 0) }));
  }

  onResetImg() {
    this.productSig.update((p) => ({
      ...p,
      imageUrl: 'https://placehold.co/320x180?text=Headset+X300',
    }));
  }

  enlargeCard() {
    this.cardWidthPxSig.update((w) => Math.min(w + 40, 560));
  }
  shrinkCard() {
    this.cardWidthPxSig.update((w) => Math.max(w - 40, 240));
  }
  toggleFeatured() {
    this.productSig.update((p) => ({ ...p, featured: !p.featured }));
  }

  // Telemetria leve de aula (evite coisas pesadas em effects)
  constructor() {
    effect(() => {
      // eslint-disable-next-line no-console
      console.debug('[Pai] Produto mudou →', this.productSig());
    });
  }
}

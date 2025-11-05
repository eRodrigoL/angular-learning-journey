// src/app/pages/binding/binding-child/binding-child.ts
// -------------------------------------------------------------------------------------------------
// FILHO: BindingChild — Formulário de Produto (Two-way moderno + Property/Event binding)
//
// Objetivo didático:
// - Expor um "model" para o PAI usando model<Product>() ⇒ habilita [(product)] no pai.
// - Demonstrar property binding (ex.: [value] dos inputs) e event binding ((input)/(change)).
// - Sem @Input/@Output manuais: o model() gera product/productChange.
//
// Dicas:
// - Em cenários reais, valide dados e trate formatos (ex.: preço).
// - Use Signals também para estados locais (ex.: toques de UX).
// -------------------------------------------------------------------------------------------------

import { Component, effect, input, model, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

export type Product = {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
};

@Component({
  selector: 'app-binding-child',
  imports: [JsonPipe],
  templateUrl: './binding-child.html',
  styleUrl: './binding-child.scss',
})
export class BindingChild {
  // Two-way moderno: o PAI faz [(product)]="productSig"
  product = model<Product>({
    name: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    featured: false,
  });

  // Exemplo de configuração opcional vinda do pai (property binding “cosmético”)
  label = input<string>('Configurar produto');

  // Estado local ilustrativo
  localEdits = signal(0);

  constructor() {
    effect(() => {
      // eslint-disable-next-line no-console
      console.debug('[Filho] produto mudou →', this.product());
    });
  }

  // Handlers (event binding) — atualizam o model (reflete no pai)
  onNameInput(v: string) {
    this.product.update((p) => ({ ...p, name: v }));
    this.localEdits.update((n) => n + 1);
  }
  onPriceInput(v: string) {
    const parsed = Number(v.replace(',', '.'));
    this.product.update((p) => ({ ...p, price: isFinite(parsed) ? parsed : p.price }));
    this.localEdits.update((n) => n + 1);
  }
  onStockInput(v: string) {
    const parsed = parseInt(v, 10);
    this.product.update((p) => ({ ...p, stock: isFinite(parsed) ? Math.max(parsed, 0) : p.stock }));
    this.localEdits.update((n) => n + 1);
  }
  onImageUrlInput(v: string) {
    this.product.update((p) => ({ ...p, imageUrl: v }));
    this.localEdits.update((n) => n + 1);
  }
  onFeaturedToggle(checked: boolean) {
    this.product.update((p) => ({ ...p, featured: checked }));
    this.localEdits.update((n) => n + 1);
  }

  resetToExample() {
    this.product.set({
      name: 'Headset Gamer X300',
      price: 349.9,
      stock: 12,
      imageUrl: 'https://placehold.co/320x180?text=Headset+X300',
      featured: false,
    });
    this.localEdits.set(0);
  }
}

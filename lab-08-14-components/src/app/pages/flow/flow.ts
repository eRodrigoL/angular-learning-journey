// -------------------------------------------------------------------------------------------------
// PÁGINA: Flow — Aulas 10 e 11 (novo control flow @if/@switch/@for) + Signals
// Cenário: Painel de Pedidos com filtros, ordenação e ações de status.
// Mostra:
//  - @if: exibir/ocultar filtros; mensagens de estado.
//  - @switch: badge por status.
//  - @for + track + @empty: listagem performática rastreada por id.
//  - Signals: estado de UI e dados; computed: lista filtrada/ordenada.
// -------------------------------------------------------------------------------------------------
import { Component, computed, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'canceled';
type StatusFilter = 'all' | OrderStatus;
type OrderBy = 'createdAt' | 'total';
type OrderDir = 'asc' | 'desc';

export type Order = {
  id: string;
  customer: string;
  total: number;
  createdAt: Date;
  etaDays: number;
  status: OrderStatus;
};

@Component({
  selector: 'app-flow',
  imports: [DatePipe, DecimalPipe, FormsModule],
  templateUrl: './flow.html',
  styleUrl: './flow.scss',
})
export class Flow {
  // ----------------------------- Dados (Signals) -----------------------------
  private readonly _orders = signal<Order[]>([
    {
      id: 'A-1001',
      customer: 'Ana',
      total: 349.9,
      createdAt: daysAgo(1),
      etaDays: 3,
      status: 'pending',
    },
    {
      id: 'A-1002',
      customer: 'Bruno',
      total: 1299.0,
      createdAt: daysAgo(3),
      etaDays: 2,
      status: 'paid',
    },
    {
      id: 'A-1003',
      customer: 'Cris',
      total: 199.5,
      createdAt: daysAgo(7),
      etaDays: 1,
      status: 'shipped',
    },
    {
      id: 'A-1004',
      customer: 'Dani',
      total: 89.0,
      createdAt: daysAgo(10),
      etaDays: 2,
      status: 'canceled',
    },
  ]);

  // UI (Signals)
  showFilters = signal(true);
  query = signal(''); // busca por cliente/ID
  statusFilter = signal<StatusFilter>('all');
  onlyLate = signal(false);
  orderBy = signal<OrderBy>('createdAt');
  orderDir = signal<OrderDir>('desc');

  // --------------------------- Derivações (computed) -------------------------
  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const sf = this.statusFilter();
    const lateOnly = this.onlyLate();
    const by = this.orderBy();
    const dir = this.orderDir();

    let base = this._orders();

    if (q) {
      base = base.filter(
        (o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)
      );
    }
    if (sf !== 'all') base = base.filter((o) => o.status === sf);
    if (lateOnly) base = base.filter(isLate);

    // ordenação imutável
    base = [...base].sort((a, b) => {
      const vA = by === 'createdAt' ? a.createdAt.getTime() : a.total;
      const vB = by === 'createdAt' ? b.createdAt.getTime() : b.total;
      const cmp = vA === vB ? 0 : vA < vB ? -1 : 1;
      return dir === 'asc' ? cmp : -cmp;
    });

    return base;
  });

  // ------------------------------- Ações -------------------------------------
  toggleFilters() {
    this.showFilters.update((v) => !v);
  }

  clearFilters() {
    this.query.set('');
    this.statusFilter.set('all');
    this.onlyLate.set(false);
    this.orderBy.set('createdAt');
    this.orderDir.set('desc');
  }

  advanceStatus(id: string) {
    this._orders.update((list) =>
      list.map((o) => (o.id === id ? { ...o, status: nextStatus(o.status) } : o))
    );
  }

  cancelOrder(id: string) {
    this._orders.update((list) =>
      list.map((o) => (o.id === id ? { ...o, status: 'canceled' } : o))
    );
  }

  addExample() {
    const id = 'A-' + Math.floor(1000 + Math.random() * 9000);
    const sample: Order = {
      id,
      customer: pick(['Eva', 'Fabio', 'Gus', 'Helena', 'Igor']),
      total: +(50 + Math.random() * 1500).toFixed(2),
      createdAt: daysAgo(Math.floor(Math.random() * 14)),
      etaDays: Math.floor(Math.random() * 5) + 1,
      status: pick<OrderStatus>(['pending', 'paid', 'shipped']),
    };
    this._orders.set([sample, ...this._orders()]);
  }

  // --------------------------- Handlers de UI (tipados) ----------------------
  onQueryInput(v: string) {
    this.query.set(v);
  }
  onStatusFilterChange(v: string) {
    this.statusFilter.set(v as StatusFilter);
  }
  onOnlyLateToggle(checked: boolean) {
    this.onlyLate.set(checked);
  }
  onOrderByChange(v: string) {
    this.orderBy.set(v as OrderBy);
  }
  onOrderDirChange(v: string) {
    this.orderDir.set(v as OrderDir);
  }
}

// -------------------------------- Helpers -----------------------------------
function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}
function isLate(o: Order): boolean {
  if (o.status === 'shipped' || o.status === 'canceled') return false;
  const deadline = new Date(o.createdAt);
  deadline.setDate(deadline.getDate() + (o.etaDays ?? 0));
  return deadline.getTime() < Date.now();
}
function nextStatus(s: OrderStatus): OrderStatus {
  switch (s) {
    case 'pending':
      return 'paid';
    case 'paid':
      return 'shipped';
    case 'shipped':
      return 'shipped';
    case 'canceled':
      return 'canceled';
  }
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

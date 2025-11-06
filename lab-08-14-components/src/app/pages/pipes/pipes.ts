// src/app/pages/pipes/pipes.ts
// -------------------------------------------------------------------------------------------------
// PÁGINA: Pipes (uso real) — RH / Folha de Pagamentos
//
// Demonstra:
// - currency/percent/date/number/uppercase/lowercase/titlecase/slice/json/async
// - Pipe customizada `sexo` (longo e short)
// - Filtros simples com Signals (busca/sexo/minSalário)
// - @for + track + @empty
// - Relógio reativo (async) encadeado com date
// -------------------------------------------------------------------------------------------------
import { Component, computed, signal } from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
  SlicePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SexoPipe } from '../../pipes/sexo-pipe';
import { interval, map } from 'rxjs';

type Colaborador = {
  id: string;
  nome: string;
  sexo: 'm' | 'f' | string;
  salario: number; // salário base (BRL)
  bonusRate: number; // % de bônus (0–1)
  admissao: Date; // data de admissão
  habilidades: string[]; // para demonstrar slice
};

@Component({
  selector: 'app-pipes',
  imports: [
    FormsModule,
    // pipes nativas
    UpperCasePipe,
    TitleCasePipe,
    DecimalPipe,
    CurrencyPipe,
    PercentPipe,
    DatePipe,
    JsonPipe,
    AsyncPipe,
    SlicePipe,
    // pipe custom
    SexoPipe,
  ],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss',
})
export class Pipes {
  // Relógio reativo (exibe com async + date)
  now$ = interval(1000).pipe(map(() => new Date()));

  // Base de dados (simulação)
  private readonly _colabs = signal<Colaborador[]>([
    {
      id: 'C-0001',
      nome: 'ana beatriz',
      sexo: 'f',
      salario: 5200,
      bonusRate: 0.1,
      admissao: daysAgo(120),
      habilidades: ['Angular', 'RXJS', 'A11y', 'Jest'],
    },
    {
      id: 'C-0002',
      nome: 'BRUNO SILVA',
      sexo: 'masculino',
      salario: 7800.5,
      bonusRate: 0.05,
      admissao: daysAgo(980),
      habilidades: ['Node.js', 'PostgreSQL'],
    },
    {
      id: 'C-0003',
      nome: 'Cris',
      sexo: 'Feminino',
      salario: 11200.9,
      bonusRate: 0.2,
      admissao: daysAgo(35),
      habilidades: ['Angular', 'NgRx', 'Cypress', 'Docker', 'K8s'],
    },
    {
      id: 'C-0004',
      nome: 'Dani',
      sexo: 'm',
      salario: 4300,
      bonusRate: 0,
      admissao: daysAgo(400),
      habilidades: ['HTML', 'CSS'],
    },
  ]);

  // Filtros (Signals)
  q = signal(''); // busca por nome/ID
  sexoFiltro = signal<'all' | 'm' | 'f'>('all');
  minSal = signal<number | null>(null);

  // Lista derivada (pipes são só para exibir; filtro/ordenação no TS)
  lista = computed(() => {
    const texto = this.q().trim().toLowerCase();
    const sf = this.sexoFiltro();
    const ms = this.minSal();

    let base = this._colabs();

    if (texto) {
      base = base.filter(
        (c) => c.id.toLowerCase().includes(texto) || c.nome.toLowerCase().includes(texto)
      );
    }
    if (sf !== 'all') base = base.filter((c) => String(c.sexo).toLowerCase().startsWith(sf));
    if (typeof ms === 'number') base = base.filter((c) => c.salario >= ms);

    // apenas para o exemplo: ordenar por salário desc
    base = [...base].sort((a, b) => b.salario - a.salario);

    return base;
  });

  // Helpers de cálculo (valores exibidos com pipes)
  totalBruto(c: Colaborador) {
    return c.salario * (1 + c.bonusRate);
  }
  tempoCasaDias(c: Colaborador) {
    const ms = Date.now() - c.admissao.getTime();
    return Math.floor(ms / 86400000);
  }

  // Ações de UI
  clear() {
    this.q.set('');
    this.sexoFiltro.set('all');
    this.minSal.set(null);
  }
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

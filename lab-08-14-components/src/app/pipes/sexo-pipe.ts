// src/app/pipes/sexo.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexo', standalone: true, pure: true })
export class SexoPipe implements PipeTransform {
  transform(value: unknown, opts?: { short?: boolean }): string {
    const v = String(value ?? '')
      .trim()
      .toLowerCase();
    const isF = v === 'f' || v === 'fem' || v === 'feminino';
    const isM = v === 'm' || v === 'masc' || v === 'masculino';

    if (opts?.short) return isF ? 'F' : isM ? 'M' : '';
    if (isF) return 'Feminino';
    if (isM) return 'Masculino';
    return 'Não informado';
  }
}

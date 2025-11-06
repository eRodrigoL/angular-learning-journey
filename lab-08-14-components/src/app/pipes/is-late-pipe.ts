import { Pipe, PipeTransform } from '@angular/core';

type OrderLike = {
  createdAt: Date;
  etaDays: number;
  status: 'pending' | 'paid' | 'shipped' | 'canceled';
};

/**
 * Pipe pure que indica se um pedido está atrasado:
 * - Considera arasado apenas se NÃO estier 'shipped' nem 'canceled'.
 * - Calcula prazo como createdAt + etaDays (dias corridos).
 */

@Pipe({
  name: 'isLate',
})
export class IsLatePipe implements PipeTransform {
  transform(o: OrderLike): boolean {
    if (!o) return false;
    if (o.status === 'shipped' || o.status === 'canceled') return false;

    const deadline = new Date(o.createdAt);
    deadline.setDate(deadline.getDate() + (o.etaDays ?? 0));
    return deadline.getTime() < Date.now();
  }
}

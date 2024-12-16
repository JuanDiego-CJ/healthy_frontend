import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planStatus',
  standalone: true
})
export class PlanStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'ACTIVO';
      case 'COMPLETED':
        return 'COMPLETADO';
      case 'ABANDONED':
        return 'ABANDONADO';
      default:
        return status;
    }
  }

}

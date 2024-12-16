import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'goalStatus',
  standalone: true
})
export class GoalStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch (status) {
      case 'IN_PROGRESS':
        return 'En Progreso';
      case 'ACHIEVED':
        return 'Alcanzado';
      case 'FAILED':
        return 'Fallido';
      case 'ABANDONED':
        return 'Abandonado';
      default:
        return status;
    }
  }
}

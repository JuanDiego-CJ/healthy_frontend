import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'habitType',
  standalone: true
})
export class HabitTypePipe implements PipeTransform {
  transform(name: string): string {
    switch (name) {
      case 'Daily Exercise':
        return 'Ejercicio diario';
      case 'Healthy Eating':
        return 'Comer saludable';
      case 'Meditation':
        return 'Meditación';
      case 'Reading':
        return 'Leer';
      case 'Sleep 8 hours':
        return 'Horas de sueño';
      default:
        return name;
    }
  }
}
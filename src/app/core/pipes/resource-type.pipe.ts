import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resourceType',
  standalone: true
})
export class ResourceTypePipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case 'ARTICLE':
        return 'ARTICULO';
      case 'GUIDE':
        return 'GUIA';
      case 'WORKOUT_PLAN':
        return 'PLAN DE ENTRENAMIENTO';
    case 'RECIPE':
        return 'PLAN DE ENTRENAMIENTO';
      default:
        return type;
    }
  }

}
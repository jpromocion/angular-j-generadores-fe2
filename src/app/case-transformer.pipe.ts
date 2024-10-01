/**
 * Una pipe para invocar sobre un texto y transformarlo en masyusculas, minusculas o capitalizado segun el tipo indicado
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caseTransformer',
  standalone: true
})
export class CaseTransformerPipe implements PipeTransform {

  transform(value: string, caseType: string): string {

    if (!value) return value;

    switch (caseType) {
      case 'M':
        return value.toUpperCase();
      case 'm':
        return value.toLowerCase();
      case 'c':
        return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
      default:
        return value;
    }
  }

}



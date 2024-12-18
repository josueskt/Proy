import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxLengthPerWordValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const words = value.split(',').map(word => word.trim()); // Separa las palabras y elimina espacios
    const invalidWords = words.filter(word => word.length > maxLength); // Busca palabras demasiado largas

    return invalidWords.length > 0 
      ? { maxLengthPerWord: { maxLength, invalidWords } } 
      : null; // Retorna error si hay palabras largas
  };
}

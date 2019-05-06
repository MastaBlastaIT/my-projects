import {Pipe, PipeTransform} from '@angular/core';
import {CaseNames} from '../model/case-names';

@Pipe({
    name: 'maskCase',
})
export class MaskCasePipe implements PipeTransform {
    transform(value: string, caseType: number): string {
        const toTitleCase = (str: string): string =>
            str
                .toLowerCase()
                .split(' ')
                .map(word => word.replace(word[0], word[0].toUpperCase()))
                .join(' ');

        switch (caseType) {
            case CaseNames.upper:
                return value.toUpperCase();

                break;
            case CaseNames.lower:
                return value.toLowerCase();

                break;
            case CaseNames.title:
                return toTitleCase(value);

                break;
            default:
                return value;
        }
    }
}

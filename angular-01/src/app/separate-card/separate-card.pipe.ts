import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'separateCard',
})
export class SeparateCardPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/(.{4})/g, '$1 ').trim();
    }
}

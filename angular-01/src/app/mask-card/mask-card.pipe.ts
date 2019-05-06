import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'maskCard',
})
export class MaskCardPipe implements PipeTransform {
    transform(value: string, firstDigitsToShow: number = 0): string {
        const toHide = value.slice(firstDigitsToShow, -4);

        return (
            value.slice(0, firstDigitsToShow) +
            toHide.replace(/./g, '*') +
            value.slice(-4)
        );
    }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeparateCardPipe} from './separate-card.pipe';

@NgModule({
    declarations: [SeparateCardPipe],
    exports: [SeparateCardPipe],
    imports: [CommonModule],
})
export class SeparateCardModule {}

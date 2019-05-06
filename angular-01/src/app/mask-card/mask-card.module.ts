import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaskCardPipe} from './mask-card.pipe';

@NgModule({
    declarations: [MaskCardPipe],
    exports: [MaskCardPipe],
    imports: [CommonModule],
})
export class MaskCardModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class CardModule {}

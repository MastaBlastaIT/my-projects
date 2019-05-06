import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseComponent} from './case.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [CaseComponent],
    exports: [CaseComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class CaseModule {}

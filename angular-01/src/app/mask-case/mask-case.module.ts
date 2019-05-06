import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaskCasePipe} from './mask-case.pipe';

@NgModule({
    declarations: [MaskCasePipe],
    exports: [MaskCasePipe],
    imports: [CommonModule],
})
export class MaskCaseModule {}

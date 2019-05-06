import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeComponent} from './pipe.component';
import {MaskCardModule} from '../mask-card/mask-card.module';
import {SeparateCardModule} from '../separate-card/separate-card.module';
import {CardModule} from '../card/card.module';
import {CaseModule} from '../case/case.module';
import {CardService} from '../card/services/card.service';
import {CaseService} from '../case/services/case.service';
import {MaskCaseModule} from '../mask-case/mask-case.module';

@NgModule({
    declarations: [PipeComponent],
    exports: [PipeComponent],
    imports: [
        CommonModule,
        MaskCardModule,
        SeparateCardModule,
        CardModule,
        CaseModule,
        MaskCaseModule,
    ],
    providers: [CardService, CaseService],
})
export class PipeModule {}

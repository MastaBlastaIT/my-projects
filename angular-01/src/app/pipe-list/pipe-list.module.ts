import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeListComponent} from './pipe-list.component';
import {PipeModule} from '../pipe/pipe.module';
import {PipeListService} from './services/pipe-list.service';

@NgModule({
    declarations: [PipeListComponent],
    exports: [PipeListComponent],
    imports: [CommonModule, PipeModule],
    providers: [PipeListService],
})
export class PipeListModule {}

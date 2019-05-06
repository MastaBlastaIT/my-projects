import {Component, Input, OnInit} from '@angular/core';
import {Pipe} from '../model/pipe';
import {CardService} from '../card/services/card.service';
import {CaseService} from '../case/services/case.service';

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.css'],
})
export class PipeComponent implements OnInit {
    @Input() pipeBlock: Pipe;

    cardNum: string;

    caseText: string;

    caseType: number;

    constructor(private cardService: CardService, private caseService: CaseService) {}

    ngOnInit() {
        this.setPipe(this.cardService.setCard(), 'card');
        this.setPipe(this.caseService.setCase(), 'case');
    }

    onAddPipe(pipeOut: string, type: string) {
        this.setPipe(pipeOut, type);
    }

    onSelectCase(type: number) {
        this.caseType = type;
    }

    get toOut(): string {
        return !this.pipeBlock.id ? this.cardNum : this.caseText;
    }

    private setPipe(toSet: string, type: string) {
        type === 'card' ? (this.cardNum = toSet) : (this.caseText = toSet);
    }
}

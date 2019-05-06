import {Component, OnInit} from '@angular/core';
import {Pipe} from '../model/pipe';
import {PipeListService} from './services/pipe-list.service';

@Component({
    selector: 'app-pipe-list',
    templateUrl: './pipe-list.component.html',
    styleUrls: ['./pipe-list.component.css'],
})
export class PipeListComponent implements OnInit {
    pipes: Pipe[] = [];
    constructor(private pipeListService: PipeListService) {}

    ngOnInit() {
        this.pipes = this.pipeListService.getPipes();
    }
}

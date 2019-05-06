import {Injectable} from '@angular/core';
import {Pipe} from '../../model/pipe';

@Injectable()
export class PipeListService {
    constructor() {}

    getPipes(): Pipe[] {
        return [
            {
                id: 0,
                name: 'Пайп для 16-значных номеров карт',
            },
            {
                id: 1,
                name: 'ConvertCase пайп',
            },
        ];
    }
}

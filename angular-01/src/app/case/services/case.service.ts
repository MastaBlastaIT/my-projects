import {Injectable} from '@angular/core';

@Injectable()
export class CaseService {
    constructor() {}

    setCase(): string {
        return 'text to pipe';
    }
}

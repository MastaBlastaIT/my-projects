import {TestBed} from '@angular/core/testing';

import {PipeListService} from './pipe-list.service';

describe('PipeListService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PipeListService = TestBed.get(PipeListService);

        expect(service).toBeTruthy();
    });
});

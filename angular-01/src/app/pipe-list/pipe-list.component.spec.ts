import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PipeListComponent} from './pipe-list.component';

describe('PipeListComponent', () => {
    let component: PipeListComponent;
    let fixture: ComponentFixture<PipeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PipeListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PipeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

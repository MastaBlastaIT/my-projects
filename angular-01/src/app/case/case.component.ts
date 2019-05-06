import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CaseNames} from '../model/case-names';

@Component({
    selector: 'app-case',
    templateUrl: './case.component.html',
    styleUrls: ['./case.component.css'],
})
export class CaseComponent implements OnInit {
    @Output() addCase = new EventEmitter<string>();

    @Output() selectCase = new EventEmitter<number>();

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    initForm(caseToSet: string = 'default') {
        this.form = this.formBuilder.group({
            toPipeText: [''],
            selectCase: [caseToSet],
        });
    }

    ngOnInit() {
        this.initForm();
    }

    setForm(elementToSet: string = 'input') {
        const value: string =
            elementToSet === 'input'
                ? this.form.value.toPipeText
                : this.form.value.selectCase;

        if (this.form.value.invalid) {
            return;
        }

        elementToSet === 'input'
            ? this.addCase.emit(value)
            : this.selectCase.emit(CaseNames[value]);
    }
}

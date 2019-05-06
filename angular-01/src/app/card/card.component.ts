import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cardNumberValidator} from '../card-number-validate/card-number-validate';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
    @Output() addCard = new EventEmitter<string>();

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    initForm() {
        this.form = this.formBuilder.group({
            cardNumber: ['', [Validators.required, cardNumberValidator()]],
        });
    }

    ngOnInit() {
        this.initForm();
    }

    onClick() {
        const beforePipeVal: string = this.form.value.cardNumber;

        if (this.form.value.invalid) {
            return;
        }

        this.addCard.emit(beforePipeVal);
        this.initForm();
    }
}

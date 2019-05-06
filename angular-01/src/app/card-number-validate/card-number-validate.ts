import {FormControl} from '@angular/forms';

export const cardNumberValidator = () => (control: FormControl) => {
    const cardNumberLength = control.value.length;

    if (!control.value) {
        return {
            isError: 1,
            validError: 1,
            validErrorText: 'поле обязательно для заполнения',
        };
    }

    const cardNumberValue = Number(control.value);

    if (cardNumberLength < 16 && !isNaN(cardNumberValue)) {
        return {
            isError: 1,
            lengthError: 1,
            lengthErrorText: `введено ${cardNumberLength} цифр, требуется - 16`,
        };
    }

    if (isNaN(cardNumberValue)) {
        return {
            isError: 1,
            valueError: 1,
            valueErrorText: `требуются только цифры`,
        };
    }

    return {
        isSuccess: 1,
        successText: `OK! \ud83d\udc4c`,
    };
};

import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

export interface RadioButtonOption {
    label: string;
    value: string;
}

@Component({
    moduleId: module.id,
    selector: 'radiobuttons-input',
    templateUrl: 'radiobuttons-input.component.html',
    styleUrls: ['form-input.component.css']
})
export class RadioButtonsInputComponent extends AbstractInput implements OnInit {
    @Input() options: RadioButtonOption[] = [];
    public error: string = '';

    constructor() {
        super();
    }

   /**
    * Initialize relevant variables when the directive is instantiated
    */
    ngOnInit() {
        super.ngOnInit();
        this.parseInputOptions();
        this.addValidatorsToFormControl();
    }

    protected addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }

    protected updateChanges() {
        this.formControl.markAsDirty();
    }

    protected parseInputOptions(): void {
        if (!this.formControl.value) {
            this.error = 'Field required: must toggle on one of the choices.';
            return;
        }
        let existing = false;
        this.options.forEach((option: RadioButtonOption) => {
            if (option.value === this.formControl.value) {
                existing = true;
            }
        });

        if (!existing) {
            this.error = 'Unknown input value: ' + this.formControl.value;
        }
    }
}

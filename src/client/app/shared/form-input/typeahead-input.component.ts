import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead/typeahead-match.class';

@Component({
    moduleId: module.id,
    selector: 'typeahead-input',
    templateUrl: 'typeahead-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TypeaheadInputComponent),
        multi: true
    }]
})
export class TypeaheadInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Input() minlength: number = 2;
    @Input() maxlength: number = 20;
    @Input() codelist: string[] = [];

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onSelect(event: TypeaheadMatch): void {
        if (this.controlName === 'antennaType' && event.value.length === 20) {
            let radomeType = event.value.substring(16, 20);
            this.form.controls.antennaRadomeType.setValue(radomeType);
            this.form.controls.antennaRadomeType.markAsDirty();
        }
        this.formControl.markAsDirty();
    }

    writeValue(value: string) { }

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    getReadonlyAttribute(): string {
        return this.readonly;
    }
}

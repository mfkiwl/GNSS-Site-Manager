import { GeodesyMLCodelistService } from '../geodesyml-codelist/geodesyml-codelist.service';
import { Component, Input, EventEmitter, Output, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'antenna-type-input',
    templateUrl: 'antenna-type-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AntennaTypeInputComponent),
        multi: true
    }]
})
export class AntennaTypeInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Output() antennaRadomeTypeChange: EventEmitter<any> = new EventEmitter<any>();

    allAntennaCodes: string[] = [];

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    /**
    * Creates a new AntennaTypeInputComponent with the injected Http.
    * @param geodesyMLCodelistService - Service for fetching XML and converting to IGS Receiver Code
    * @constructor
    */
    constructor(private geodesyMLCodelistService: GeodesyMLCodelistService) {
        super();
    }

    /**
     * Fetch IGS Antenna Code list from GeodesyMLCodelistService
     */
    ngOnInit() {
        super.ngOnInit();
        this.allAntennaCodes = this.geodesyMLCodelistService.getAntennaRadomeCodes();
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

    onKeyUp(event: any) {
        event.value = event.currentTarget.value;
        this.antennaRadomeTypeChange.emit(event);
    }

    onSelect(event: any) {
        this.antennaRadomeTypeChange.emit(event);
    }
}

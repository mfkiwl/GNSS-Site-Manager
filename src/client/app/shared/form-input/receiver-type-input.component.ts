import { GeodesyMLCodelistService } from '../geodesyml-codelist/geodesyml-codelist.service';
import { Component, Input, EventEmitter, Output, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'receiver-type-input',
    templateUrl: 'receiver-type-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ReceiverTypeInputComponent),
        multi: true
    }]
})
export class ReceiverTypeInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Output() receiverTypeChange: EventEmitter<any> = new EventEmitter<any>();

    allReceiverCodes : string[] = [];

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    /**
    * Creates a new ReceiverTypeInputComponent with the injected Http.
    * @param geodesyMLCodelistService - Service for fetching XML and converting to IGS Receiver Code
    * @constructor
    */
    constructor(private geodesyMLCodelistService: GeodesyMLCodelistService) {
        super();
    }

    /**
     * Fetch IGS Receiver Code list from GeodesyMLCodelistService
     */
    ngOnInit() {
        super.ngOnInit();
        this.geodesyMLCodelistService.getCodelist('Receiver').subscribe(codeList => {
            this.allReceiverCodes = codeList;
        });
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    getReadonlyAttribute(): string {
        return this.readonly;
    }

    onEnter(event: any) {
        event.value = event.currentTarget.value;
        this.receiverTypeChange.emit(event);
    }

    onSelect(event: any) {
        this.receiverTypeChange.emit(event);
    }
}

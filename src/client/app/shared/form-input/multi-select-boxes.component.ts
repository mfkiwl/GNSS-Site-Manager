import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';
import { CorsNetworkModel } from '../cors-network/cors-network-model';

@Component({
    moduleId: module.id,
    selector: 'multi-select-boxes',
    templateUrl: 'multi-select-boxes.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectBoxesComponent),
        }
    ]
})
export class MultiSelectBoxesComponent extends AbstractInput implements ControlValueAccessor {
    @Input() options: CorsNetworkModel[];
    @Input() selects: CorsNetworkModel[];

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

    canAddItems(): boolean {
        if (this.form.disabled)
            return false;
        return this.hasItemsSelected(this.options);
    }

    canRemoveItems(): boolean {
        if (this.form.disabled)
            return false;
        return this.hasItemsSelected(this.selects);
    }

    addSelectedItems() {
        if (this.form.disabled)
            return;

        this.options.forEach((item: CorsNetworkModel) => {
            if (item.selected) {
                item.selected = false;
                item.added = true;
                this.selects.push(item.clone());
            }
        });
    }

    removeSelectedItems() {
        if (this.form.disabled)
            return;

        for (let i = this.selects.length - 1; i >= 0; i --) {
            if (this.selects[i].selected) {
                this.markOptionItemById(this.selects[i].id);
                this.selects[i].selected = false;
                this.selects.splice(i, 1);
            }
        }
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    private markOptionItemById(id: number) {
        for (let item of this.options) {
            if (item.id === id) {
                item.selected = false;
                item.added = false;
                return;
            }
        }
    }

    private hasItemsSelected(items: CorsNetworkModel[]): boolean {
        for (let item of items) {
            if (item.selected) {
                return true;
            }
        }
        return false;
    }
}

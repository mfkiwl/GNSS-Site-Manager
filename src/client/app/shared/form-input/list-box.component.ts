import { Component, Input } from '@angular/core';
import { CorsNetworkModel } from '../cors-network/cors-network-model';

@Component({
    moduleId: module.id,
    selector: 'list-box',
    templateUrl: 'list-box.component.html',
    styleUrls: ['form-input.component.css'],
})
export class ListBoxComponent {
    @Input() inputItemList: CorsNetworkModel[];
    @Input() disabled: string;
    @Input() cssNgDirty: string;

    markSelected(index: number) {
        if (!this.disabled) {
            this.inputItemList[index].selected = !this.inputItemList[index].selected;
        }
    }
}

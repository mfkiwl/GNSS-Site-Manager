import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GnssReceiverGroupComponent } from './gnss-receiver-group.component';
import { GnssReceiverItemComponent } from './gnss-receiver-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [GnssReceiverGroupComponent, GnssReceiverItemComponent],
    exports: [GnssReceiverGroupComponent, GnssReceiverItemComponent]
})
export class GnssReceiverModule {
}

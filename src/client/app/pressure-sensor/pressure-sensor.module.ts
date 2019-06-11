import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PressureSensorGroupComponent } from './pressure-sensor-group.component';
import { PressureSensorItemComponent } from './pressure-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [PressureSensorGroupComponent, PressureSensorItemComponent],
    exports: [PressureSensorGroupComponent, PressureSensorItemComponent, FormInputModule]
})
export class PressureSensorModule {
}

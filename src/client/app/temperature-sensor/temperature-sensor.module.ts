import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemperatureSensorGroupComponent } from './temperature-sensor-group.component';
import { TemperatureSensorItemComponent } from './temperature-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [TemperatureSensorGroupComponent, TemperatureSensorItemComponent],
    exports: [TemperatureSensorGroupComponent, TemperatureSensorItemComponent, FormInputModule]
})
export class TemperatureSensorModule {
}

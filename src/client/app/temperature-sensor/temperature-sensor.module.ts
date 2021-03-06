import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemperatureSensorsGroupComponent } from './temperature-sensors-group.component';
import { TemperatureSensorItemComponent } from './temperature-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [TemperatureSensorsGroupComponent, TemperatureSensorItemComponent],
    exports: [TemperatureSensorsGroupComponent, TemperatureSensorItemComponent, FormInputModule]
})
export class TemperatureSensorModule {
}

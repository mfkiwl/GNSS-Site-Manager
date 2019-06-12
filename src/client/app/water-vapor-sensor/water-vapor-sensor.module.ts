import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaterVaporSensorGroupComponent } from './water-vapor-sensor-group.component';
import { WaterVaporSensorItemComponent } from './water-vapor-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [WaterVaporSensorGroupComponent, WaterVaporSensorItemComponent],
    exports: [WaterVaporSensorGroupComponent, WaterVaporSensorItemComponent, FormInputModule]
})
export class WaterVaporSensorModule {
}

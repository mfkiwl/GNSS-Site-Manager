import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalEpisodicEffectGroupComponent } from './local-episodic-effect-group.component';
import { LocalEpisodicEffectItemComponent } from './local-episodic-effect-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [LocalEpisodicEffectGroupComponent, LocalEpisodicEffectItemComponent],
    exports: [LocalEpisodicEffectGroupComponent, LocalEpisodicEffectItemComponent, FormInputModule]
})
export class LocalEpisodicEffectModule {
}

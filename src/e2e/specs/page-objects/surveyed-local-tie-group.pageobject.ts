import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class SurveyedLocalTieGroup extends LogItemGroup {

    readonly tiedMarkerNameInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerName"] input'));
    readonly tiedMarkerUsageInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerUsage"] input'));
    readonly tiedMarkerCDPNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerCDPNumber"] input'));
    readonly tiedMarkerDOMESNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerDOMESNumber"] input'));
    readonly dxInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dx"] input'));
    readonly dyInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dy"] input'));
    readonly dzInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dz"] input'));
    readonly localSiteTiesAccuracyInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="localSiteTiesAccuracy"] input'));
    readonly surveyMethodInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="surveyMethod"] input'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Surveyed Local Tie');
        this.hasEndDateInput = false;
        this.inputElements = [
            this.tiedMarkerNameInput,
            this.tiedMarkerUsageInput,
            this.tiedMarkerCDPNumberInput,
            this.tiedMarkerDOMESNumberInput,
            this.dxInput,
            this.dyInput,
            this.dzInput,
            this.localSiteTiesAccuracyInput,
            this.surveyMethodInput,
            this.notesInput,
        ];
    }
}

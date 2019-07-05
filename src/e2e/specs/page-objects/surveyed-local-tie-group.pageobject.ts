import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class SurveyedLocalTieGroup extends LogItemGroup {

    readonly tiedMarkerNameInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerName"]'));
    readonly tiedMarkerUsageInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerUsage"]'));
    readonly tiedMarkerCDPNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerCDPNumber"]'));
    readonly tiedMarkerDOMESNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerDOMESNumber"]'));
    readonly dxInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dx"]'));
    readonly dyInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dy"]'));
    readonly dzInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dz"]'));
    readonly localSiteTiesAccuracyInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="localSiteTiesAccuracy"]'));
    readonly surveyMethodInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="surveyMethod"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('Surveyed Local Tie');
        this.hasEndDateInput = false;
        this.getInputElements();
    }

    public getInputElements() {
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

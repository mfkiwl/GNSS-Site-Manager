import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class SurveyedLocalTieGroup extends LogItemGroup {

    public constructor() {
        super('Surveyed Local Tie');
        this.hasEndDate = false;
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('tiedMarkerName', 'text'),
            new InputField('tiedMarkerUsage', 'text'),
            new InputField('tiedMarkerCDPNumber', 'text'),
            new InputField('tiedMarkerDOMESNumber', 'text'),
            new InputField('dx', 'number'),
            new InputField('dy', 'number'),
            new InputField('dz', 'number'),
            new InputField('localSiteTiesAccuracy', 'number'),
            new InputField('surveyMethod', 'text'),
            new InputField('notes', 'textarea'),
        ];
    }
}

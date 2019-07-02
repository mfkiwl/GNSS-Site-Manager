import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { InputField, LogItemGroup } from '../page-objects/log-item-group.pageobject';

/*
 * The Responsible-Party Group page object is shared by groups of Site Owner, Site Contacts, Site Metadata Custodian,
 * Site Data Centers and Site Data Source under Site-Information
 *     - Site Owner: 0 - 1 optional
 *     - Site Contact: 0 - n optional
 *     - Site Data Center: 0 - n optional
 *     - Site Data Source: 0 - 1 optional
 *     - Site Metadata Custodian: 1 mandatory
 */
export class ResponsiblePartyGroup extends LogItemGroup {
    public canAddNewItem: boolean;
    public backupModel: any = {};

    public constructor(partyName: string) {
        super(partyName);
        this.hasEndDate = false;
        this.canAddNewItem = false;

        this.items = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                            .all(by.css('gnss-responsible-party-item'));
        this.items.count().then((value: number) => {
            this.noOfItems = value;
            if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
                this.canAddNewItem = true;
            } else if (this.noOfItems === 0) {
                this.canAddNewItem = true;
            }
        });
    }

    public getGroupName(): string {
       let groupName: string = this.itemName;
       if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
            groupName += 's';
       }
       return groupName;
    }

    public setupInputFields(): void {
        this.inputFields = [
            new InputField('individualName', 'text'),
            new InputField('organisationName', 'text'),
            new InputField('positionName', 'text'),
            new InputField('deliveryPoint', 'textarea'),
            new InputField('city', 'text'),
            new InputField('administrativeArea', 'text'),
            new InputField('postalCode', 'text'),
            new InputField('country', 'text'),
            new InputField('email', 'email'),
            new InputField('primaryPhone', 'text'),
            new InputField('secondaryPhone', 'text'),
            new InputField('fax', 'text'),
        ];
    }

    /**
     * Find out the new responsibleParty item by its unique position name appended with timestamp
     */
    public updateNewItemElements(noOfItems: number, positionNameValue: string = null): void {
        if (noOfItems < 2 || !positionNameValue) {
            this.updateInputElements();
        } else {
            let positionNameInputs: ElementArrayFinder = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                                                         .all(by.css('text-input[controlName="positionName"] input'));
            positionNameInputs.each((element: ElementFinder, index: number) => {
                element.getAttribute('value').then((value: string) => {
                    if (value === positionNameValue) {
                        this.updateInputElements(index);
                        console.log('\tNew item index for ' + this.getGroupName() + ': ' + index);
                    }
                });
            });
        }
    }
}

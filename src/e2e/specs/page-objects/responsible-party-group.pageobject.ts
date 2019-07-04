import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

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

    public individualNameInput: ElementFinder;
    public organisationNameInput: ElementFinder;
    public positionNameInput: ElementFinder;
    public deliveryPointInput: ElementFinder;
    public cityInput: ElementFinder;
    public administrativeAreaInput: ElementFinder;
    public postalCodeInput: ElementFinder;
    public countryInput: ElementFinder;
    public emailInput: ElementFinder;
    public primaryPhoneInput: ElementFinder;
    public secondaryPhoneInput: ElementFinder;
    public faxInput: ElementFinder;
    public urlInput: ElementFinder;

    public canAddNewItem: boolean;
    public backupModel: any = {};

    public constructor(partyName: string) {
        super(partyName);
        this.hasEndDateInput = false;
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
        this.setInputElements();
    }

    public getGroupName(): string {
       let groupName: string = this.itemName;
       if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
            groupName += 's';
       }
       return groupName;
    }

    /**
     * Find out the new responsibleParty item by its unique position name appended with timestamp
     */
    public updateNewItemElements(positionNameValue: string): void {
        if (this.noOfItems === 0 || !positionNameValue) {
            this.setInputElements();
        } else {
            let positionNameInputs: ElementArrayFinder = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                                                         .all(by.css('text-input[controlName="positionName"] input'));
            positionNameInputs.each((element: ElementFinder, index: number) => {
                element.getAttribute('value').then((value: string) => {
                    if (value === positionNameValue) {
                        this.newItemIndex = index;
                        this.setInputElements();
                        console.log('\tNew item index for ' + this.getGroupName() + ': ' + index);
                    }
                });
            });
        }
    }

    private setInputElements(): void {
        this.newItemContainer = this.getNewItemContainer();
        this.individualNameInput = this.newItemContainer.element(by.css('text-input[controlName="individualName"] input'));
        this.organisationNameInput = this.newItemContainer.element(by.css('text-input[controlName="organisationName"] input'));
        this.positionNameInput = this.newItemContainer.element(by.css('text-input[controlName="positionName"] input'));
        this.deliveryPointInput = this.newItemContainer.element(by.css('textarea-input[controlName="deliveryPoint"] textarea'));
        this.cityInput = this.newItemContainer.element(by.css('text-input[controlName="city"] input'));
        this.administrativeAreaInput = this.newItemContainer.element(by.css('text-input[controlName="administrativeArea"] input'));
        this.postalCodeInput = this.newItemContainer.element(by.css('text-input[controlName="postalCode"] input'));
        this.countryInput = this.newItemContainer.element(by.css('text-input[controlName="country"] input'));
        this.emailInput = this.newItemContainer.element(by.css('email-input[controlName="email"] input'));
        this.primaryPhoneInput = this.newItemContainer.element(by.css('text-input[controlName="primaryPhone"] input'));
        this.secondaryPhoneInput = this.newItemContainer.element(by.css('text-input[controlName="secondaryPhone"] input'));
        this.faxInput = this.newItemContainer.element(by.css('text-input[controlName="fax"] input'));
        this.urlInput = this.newItemContainer.element(by.css('url-input[controlName="url"] input'));

        this.inputElements = [
            this.individualNameInput,
            this.organisationNameInput,
            this.positionNameInput,
            this.deliveryPointInput,
            this.cityInput,
            this.administrativeAreaInput,
            this.postalCodeInput,
            this.countryInput,
            this.emailInput,
            this.primaryPhoneInput,
            this.secondaryPhoneInput,
            this.faxInput,
        ];
    }
}

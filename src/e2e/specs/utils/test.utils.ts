import { by, ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import * as moment from 'moment';

export class TestUtils {
    /**
     * Search for the given searchText in any element's text (content) in the array of elements.  An array is
     * returned from Protractors `element.all(selector)`
     *
     * @param elementArray
     * @param searchText
     * @return {ElementArrayFinder} of the elements in the array with the searchText
     */
    public static elementArrayContaining(elementArray: ElementArrayFinder, searchText: string): ElementArrayFinder {
        return elementArray.filter(function (element: ElementFinder) {
            return element.getText().then((text) => {
                return text.toLowerCase() === searchText.toLowerCase();
            });
        });
    }

    public static debug(element: ElementFinder) {
        element.getInnerHtml().then(
            (successVal) => {
                console.log('BasePage.debug success: ', successVal);
            },
            (failureVal) => {
                console.log('BasePage.debug failure: ', failureVal);
            }
        );
    }

    public static debugArray(elements: ElementArrayFinder) {
        console.log('debugArray - ');
        elements.each(TestUtils.debug);
    }

    /**
     * The given array is of promises.  Resolve those and return as an array of strings of the element.getText()
     * @param array
     * @return
     */
    public static getElementArrayAsList(array: ElementArrayFinder): promise.Promise<string[]> {
        let deferred = promise.defer();
        let out: string[] = new Array<string>();
        array.then((elements) => {
            elements.forEach((element: ElementFinder) => {
                element.getText().then(
                    (text: string) => {
                        if (text.length > 0) {
                            out.push(text);
                        }
                    }
                );
            });
        });
        deferred.fulfill(out);
        return deferred.promise;
    }

    public static getTimeStamp(): string {
        return moment().utc().format('@YYYYMMDDTHHmmss');
    }

    public static checkInputValueEqual(elemFinder: ElementFinder, testData: any) {
        elemFinder.getTagName().then((tagName: string) => {
            let inputElem: ElementFinder = TestUtils.getInputElement(elemFinder, tagName);
            elemFinder.getAttribute('controlname').then((controlName: string) => {
                let expectValue: string | number = testData[controlName];
                if (!expectValue && expectValue !== 0) {
                    console.log('\t\tSkip checking ' + controlName + ' as its expected value is null!');
                } else {
                    let expectString: string = (typeof expectValue === 'number') ? expectValue.toString() : expectValue;
                    inputElem.getAttribute('value').then((value: string) => {
                        console.log('\t\tCheck if ' + controlName + ' value is "'
                                    + expectString + '": ' + (expectString === value));
                        expect(value).toEqual(expectString);
                    });
                }
            });
        });
    }

    public static checkInputValueContain(elemFinder: ElementFinder, elemName: string, expectValue: string) {
        elemFinder.getAttribute('value').then((value: string) => {
            console.log('\t\tCheck if ' + elemName + ' "' + value + '" contains "' + expectValue + '": '
                        + (value.indexOf(expectValue) !== -1));
            expect(value).toContain(expectValue);
        });
    }

    public static checkInputValueNotNull(elemFinder: ElementFinder, elemName: string) {
        elemFinder.getAttribute('value').then((value: string) => {
            console.log('\t\tCheck if ' + elemName + ' is not null (value=' + value + ')');
            expect(value).not.toBeNull();
        });
    }

    public static checkItemCount(elemArrayFinder: ElementArrayFinder, action: string, expectCount: number) {
        elemArrayFinder.count().then((count: number) => {
            console.log('\tNumber of items after ' + action + ': ' + count);
            expect(count).toBe(expectCount);
        });
    }

    public static appendTimestamp(elemFinder: ElementFinder, timestamp: string) {
        elemFinder.getAttribute('value').then((value: string) => {
            let index: number = value.indexOf('@');
            if(index > 0) {
                value = value.substring(0, index);
            }
            elemFinder.clear();
            elemFinder.sendKeys(value + timestamp);
        });
    }

    public static changeInputValue(elemFinder: ElementFinder, model: any, backup?: any) {
        elemFinder.getTagName().then((tagName: string) => {
            let inputElem: ElementFinder = TestUtils.getInputElement(elemFinder, tagName);
            elemFinder.getAttribute('controlname').then((controlName: string) => {
                if (backup) {
                    inputElem.getAttribute('value').then((value: string) => {
                        console.log('\t\tBackup ' + controlName + ' value "' + value);
                        backup[controlName] = value;
                    });
                }

                let value: string | number = model[controlName];
                let valueString: string = (typeof value === 'number') ? value.toString() : value;
                inputElem.clear().then(() => {
                    console.log('\t\tChange ' + controlName + ' value to "' + value + '"');
                    inputElem.sendKeys(valueString);
                });
            });
        });
    }

    public static getOrdinalNumber(index: number): string {
        if (index % 10 === 1 && index !== 11) {
            return index + 'st';
        } else if (index % 10 === 2 && index !== 12) {
            return index + 'nd';
        } else if (index % 10 === 3 && index !== 13) {
            return index + 'rd';
        } else {
            return index + 'th';
        }
    }

    /**
     * Note: ElementFinder.all(by.tagName()) is safer than ElementFinder.element(by.tagName())
     * because calibrationDate has a <datetime-input> tag with 4 <input> tags inside and may throw warning:
     * "more than one element found for locator By(css selector, input) - the first result will be used"
     */
    private static getInputElement(parentElemFinder: ElementFinder, parentTagName: string): ElementFinder {
        let inputTagName: string = (parentTagName === 'textarea-input') ? 'textarea' : 'input';
        let inputElements: ElementArrayFinder = parentElemFinder.all(by.tagName(inputTagName));
        return inputElements.first();
    }
}

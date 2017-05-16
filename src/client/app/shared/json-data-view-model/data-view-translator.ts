import { JsonPointerService } from '../json-pointer/json-pointer.service';
import { AbstractViewModel } from './view-model/abstract-view-model';

export const doWriteViewToData: boolean = true;

/**
 * Tuple to assist in mapping data model to view model by defining one side of the relationship
 * pointer - Json Pointer path
 * type - type of the data defined at that path
 */
export class TypedPointer {
    pointer: string;
    type: string;

    constructor(pointer: string, type: string) {
        this.pointer = pointer;
        this.type = type;
    }
}

/**
 * Mapping to assist in mapping data model to view model by linking both sides.
 * A collection of these defines a complete (for the application) or partial (for just one or a few sections of data)
 * mapping to translate one of view or data model to the other.
 */
export class FieldMap {
    dataTypedPointer: TypedPointer;
    viewTypedPointer: TypedPointer;

    constructor(dataTypedPointer: TypedPointer, viewTypedPointer: TypedPointer) {
        this.dataTypedPointer = dataTypedPointer;
        this.viewTypedPointer = viewTypedPointer;
    }
}

export class DataViewTranslatorService {

    /**
     * Translate from data and view models.
     * @param dataModel is input.  Its paths should match the fieldMappings.dataModel
     * @param viewModel is populated.  It should exist as on object upon entry.  Its paths should match the
     * fieldMappings.viewModel
     * @param fieldMappings to/from data and view
     */
    static translateD2V<T extends AbstractViewModel>(dataModel: any, viewModel: T, fieldMappings: FieldMap[]): void {
        DataViewTranslatorService.translate(dataModel, viewModel, fieldMappings, false);
    }

    /**
     * Translate from view and data models.
     * @param viewModel is input.  Its paths should match the fieldMappings.viewModel
     * @param dataModel is populated.  It should exist as on object upon entry.  Its paths should match the
     * fieldMappings.dataModel
     * @param fieldMappings to/from data and view
     */
    static translateV2D<T extends AbstractViewModel>(viewModel: T, dataModel: any, fieldMappings: FieldMap[]): any {
        DataViewTranslatorService.translate(viewModel, dataModel, fieldMappings, true);
    }

    /**
     * Generic translate independant of view and data models.  As long as the mappings are in the source, the data will be
     * written into the mapped location in the target.
     *
     * @param source - source to read from - if writeViewToData is false then this is the data model else the view model
     * @param target - target to write to - if writeViewToData is false then this is the view model else the data model
     * @param writeViewToData - if false then write source data model to target view model (pass source, target appropriately);
     *                        if true then write source view model to target data model (pass source, target appropriately);
     */
    static translate(source: any, target: any, fieldMappings: FieldMap[], writeViewToData: boolean = false) {
        for (let fieldMap of fieldMappings) {
            // View and Data references currently retained from original translate context
            let sourceTypedPointer: TypedPointer;
            let targetTypedPointer: TypedPointer;
            if (!writeViewToData) {
                sourceTypedPointer = fieldMap.dataTypedPointer;
                targetTypedPointer = fieldMap.viewTypedPointer;
            } else {
                sourceTypedPointer = fieldMap.viewTypedPointer;
                targetTypedPointer = fieldMap.dataTypedPointer;
            }
            let sourceValue: string = JsonPointerService.get(source, sourceTypedPointer.pointer);
            if (targetTypedPointer.type === 'number') {
                JsonPointerService.set(target, targetTypedPointer.pointer, sourceValue !== null ? parseFloat(sourceValue) : null);
            } else {
                JsonPointerService.set(target, targetTypedPointer.pointer, sourceValue);
            }
        }
    }
}

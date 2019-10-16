import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { MiscUtils } from '../shared/global/misc-utils';
import { AssociatedDocumentService } from '../shared/associated-document/associated-document.service';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { AbstractBaseComponent } from '../shared/abstract-groups-items/abstract-base.component';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { ImageObject } from '../shared/thumbnail-image/image-object';
import { SiteImageModel } from './site-image-model';
import * as _ from 'lodash';

export interface SiteImage {
    id: string;
    text: string;
}

/**
 * This class represents the SiteImage sub-component under the SiteInformation Component.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-site-image',
    templateUrl: 'site-image.component.html',
    styleUrls: ['site-image.component.css'],
})
export class SiteImageComponent extends AbstractBaseComponent implements OnInit, OnDestroy {

    @Input() parentForm: FormGroup;
    @Input() siteLogModel: SiteLogViewModel;
    @Input() siteId: string;

    public imageTypes = [
        {id: 'ant_000', text: 'Antenna North Facing'},
        {id: 'ant_090', text: 'Antenna East Facing'},
        {id: 'ant_180', text: 'Antenna South Facing'},
        {id: 'ant_270', text: 'Antenna West Facing'},
        {id: 'ant_sn', text: 'Antenna Serial No'},
        {id: 'rec_sn', text: 'Receiver Serial No'},
        {id: 'ant_monu', text: 'Antenna Monument'},
        {id: 'ant_bldg', text: 'Antenna Building'},
        {id: 'ant_roof', text: 'Antenna Roof'}
    ];

    // Thumbnail image size
    public imageSize: any = {
        height: 150,
        width: 145,
    };

    public siteImageHome: string = '../../assets/data/site-images/';
    public currentImageDir: string = '../../assets/data/site-images/ALIC/current';
    public historicImageDir: string = '../../assets/data/site-images/ALIC/current';
    public validImageExtensions = ['jpeg', 'jpg', 'gif', 'png'];
    public miscUtils: any = MiscUtils;

    public siteImageForm: FormGroup;
    public isOpen: boolean = false;
    public isCurrentImgPanelOpen: boolean = false;
    public isHistoricImgPanelOpen: boolean = false;
    public isUploadPanelOpen: boolean = false;
    public siteImageModel: SiteImageModel;
    public currentImageObjects: ImageObject[];
    public historicImageObjects: ImageObject[];

    public imageUploadForm: FormGroup;
    public imageTakenDate: string;
    public selectedImageContent: Blob | string = null;
    public imageUploadErrorMsg: string;
    public useUploadMethod: boolean = true;

    private selectedImageType: any;
    private imageFile: File = null;
    private fileReader: FileReader;

    constructor(protected associatedDocumentService: AssociatedDocumentService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(siteLogService);
    }

    ngOnInit() {
        this.currentImageDir = this.siteImageHome + this.siteId + '/current/';
        this.historicImageDir = this.siteImageHome + this.siteId + '/historic/';
        this.imageTakenDate = MiscUtils.getUTCDateTime();
        this.siteImageModel = new SiteImageModel();
        this.selectedImageType = null;
        this.setupForm();
        this.loadAllImages();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.currentImageObjects = [];
        this.historicImageObjects = [];
    }

    getItemName(): string {
        return 'Site Images';
    }

    getControlName(): string {
        return 'siteImage';
    }

    getElementName(): string {
        return _.kebabCase(this.getItemName());
    }

    public isFormDirty(): boolean {
        return this.siteImageForm && this.siteImageForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteImageForm && this.siteImageForm.invalid;
    }

    public setupForm() {
        this.siteImageForm = this.formBuilder.group({
            objectMap: [''],
        });
        this.imageUploadForm = this.formBuilder.group({
            useUploadMethod: [this.useUploadMethod],
            selectedImageType: [''],
            imageUrl: [''],
            imageTakenDate: [this.imageTakenDate, [Validators.required]],
        });
        this.siteLogService.isUserAuthorisedToEditSite.subscribe(authorised => {
            if (authorised) {
                this.siteImageForm.enable();
                this.imageUploadForm.enable();
            } else {
                this.siteImageForm.disable();
                this.imageUploadForm.disable();
            }
        });
        this.parentForm.addControl('siteImage', this.siteImageForm);
        this.imageUploadForm.controls['useUploadMethod'].valueChanges.subscribe((value: boolean) => {
              this.useUploadMethod = value;
              this.resetUploadPanel();
        });
    }

    public loadAllImages(): void {

        this.currentImageObjects = [];
        this.siteImageModel.getCurrentSiteImageNames().forEach((imgName: string) => {
            let imgObj = this.parseImageObject(this.currentImageDir, imgName);
            if (imgObj) {
                this.currentImageObjects.push(imgObj);
            }
        });
        this.currentImageObjects = this.sortImagesByName(this.currentImageObjects, 'asc');

        this.historicImageObjects = [];
        this.siteImageModel.getHistoricSiteImageNames().forEach((imgName: string) => {
            let imgObj = this.parseImageObject(this.historicImageDir, imgName);
            if (imgObj) {
                this.historicImageObjects.push(imgObj);
            }
        });
        this.historicImageObjects = this.sortImagesByName(this.historicImageObjects, 'asc');
    }

    public setUploadImageType(value: any): void {
        this.selectedImageType = value;
    }

    public selectImage(imageInput: any): void {
        this.selectedImageContent = null;
        if (imageInput.files && imageInput.files[0]) {
            this.imageFile = imageInput.files[0];
            this.fileReader = new FileReader();
            this.fileReader.readAsDataURL(this.imageFile);
            this.fileReader.onload = (event: any) => {
                this.selectedImageContent = event.target.result;
            };
        }
    }

    public isValidImage(): boolean {
        return  this.selectedImageContent !== null;
    }

    public setImageUrl(event: any) {
        this.selectedImageContent = null;
        this.imageUploadErrorMsg = '';
        let imageUrl = this.imageUploadForm.controls['imageUrl'].value;
        if (!imageUrl || imageUrl.length === 0) {
            return;
        } else if (this.isValidPath(imageUrl)) {
            this.selectedImageContent = imageUrl;
        } else {
            this.imageUploadErrorMsg = 'Invalid image URL';
        }
    }

    public canUploadImage(): boolean {
        return this.imageUploadForm.valid && this.selectedImageType && this.isValidImage();
    }

    public uploadImage(): void {
        let imageName: string = this.siteId + '_' + this.selectedImageType.id + '_'
                                + MiscUtils.formatDateTimeString(this.imageTakenDate) + '.'
                                + this.imageFile.name.split('.').pop();
        console.log('new image name='+imageName + '; original image name=' + this.imageFile.name
                + '; image type='+this.imageFile.type + '; image size='+this.imageFile.size);
        this.associatedDocumentService.uploadDocument(imageName, this.imageFile)
            .subscribe((response: Response) => {
                const s3ObjectUrl = response.text();
                console.log('s3ObjectUrl='+s3ObjectUrl);
                this.siteImageForm.markAsDirty();
                this.resetUploadPanel();
            });
    }

    private isValidPath(imagePath: string): boolean {
        if (!imagePath || imagePath.length < 10 || imagePath.lastIndexOf('.') === -1) {
            return false;
        }
        let index = imagePath.lastIndexOf('.');
        let imgExtn = imagePath.substring(index + 1).toLowerCase();
        return _.indexOf(this.validImageExtensions, imgExtn) !== -1;
    }

    private parseImageObject(imageDir: string, imageName: string): ImageObject {
        let startIndex = imageName.indexOf('_');
        let endIndex = imageName.lastIndexOf('_');
        if (startIndex !== -1 && endIndex !== -1) {
            const key = imageName.substring(startIndex, endIndex);
            const imgTitle = this.siteImageModel.imageDefinition.get(key);
            const timeStamp = imageName.substring(endIndex + 1, endIndex + 9);
            const imagePath = imageDir + imageName;
            if (imgTitle && timeStamp) {
                return new ImageObject(imgTitle, imagePath, timeStamp);
            }
        }
        return null;
    }

    private sortImagesByName(images: ImageObject[], sort: string): ImageObject[] {
        return images.sort((previous: ImageObject, current: ImageObject) => {
            if (previous.fullImage > current.fullImage) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous.fullImage < current.fullImage) {
                return sort === 'asc' ? -1 : 1;
            } else {
                return 0;
            }
        });
    }

    private sortImagesByDateUpload(images: ImageObject[], sort: string): ImageObject[] {
        return images.sort((previous: ImageObject, current: ImageObject) => {
            if (previous.dateUpload > current.dateUpload) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous.dateUpload < current.dateUpload) {
                return sort === 'asc' ? -1 : 1;
            } else {
                return 0;
            }
        });
    }

    private resetUploadPanel() {
        this.imageUploadForm.controls['imageUrl'].setValue(null);
        this.imageUploadForm.controls['imageUrl'].markAsPristine();
        this.selectedImageContent = null;
        this.imageUploadErrorMsg = '';
    }
}

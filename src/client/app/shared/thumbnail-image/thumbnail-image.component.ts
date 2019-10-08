import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    SimpleChange,
    SimpleChanges,
    OnDestroy
} from '@angular/core';
import { ImageObject } from './image-object';

@Component({
    moduleId: module.id,
    selector: 'thumbnail-image',
    templateUrl: 'thumbnail-image.component.html',
    styleUrls: ['thumbnail-image.component.css'],
})
export class ThumbnailImageComponent implements OnChanges, OnInit, OnDestroy {

    thumbImageWidth: number = 200;
    thumbImageHeight: number = 150;
    imagePanelHeight: number = 320;

    // @inputs
    @Input() set imageSize(data: any) {
        if (data && typeof (data) === 'object') {
            if (data.hasOwnProperty('width') && typeof (data['width']) === 'number') {
                this.thumbImageWidth = data['width'];
            }
            if (data.hasOwnProperty('height') && typeof (data['height']) === 'number') {
                this.thumbImageHeight = data['height'];
            }
        }
    }
    @Input() allowPopupFullImage: boolean = true;
    @Input() images: Array<ImageObject> = [];
    @Input() itemsPerSlider: number = 6;

    public showFullSizeImage: boolean = false;
    public fullImageIndex: number = 0;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setSliderWidth();
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key && this.showFullSizeImage) {
            if (event.key.toLowerCase() === 'escape') {
                this.closeFullSizeImage();
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        private elRef: ElementRef
    ) { }

    ngOnInit() {
        this.setSliderWidth();
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this.images = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.imageSize) {
            const size: SimpleChange = changes.imageSize;
            if (size.previousValue && size.currentValue
                && size.previousValue.width && size.previousValue.height
                && size.currentValue.width && size.currentValue.height
                && (size.previousValue.width !== size.currentValue.width
                    || size.previousValue.height !== size.currentValue.height)) {
                this.setSliderWidth();
            }
        }
    }

    setSliderWidth() {
        this.imagePanelHeight = 2 * this.thumbImageHeight + 20;
    }

    viewFullImage(index: number) {
        if (this.allowPopupFullImage) {
            this.fullImageIndex = index;
            this.openFullSizeImage();
        }
    }

    openFullSizeImage() {
        if (this.images && this.images[this.fullImageIndex]) {
            this.showFullSizeImage = true;
            this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
        }
    }

    closeFullSizeImage() {
        this.showFullSizeImage = false;
        this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
    }
}

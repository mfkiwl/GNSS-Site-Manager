export class ImageObject {

    public title: string;
    public fullImage: string;
    public thumbImage: string;
    public dateUpload: string;

    constructor(title: string, imagePath: string, date: string) {
        this.title = title;
        this.fullImage = imagePath;
        this.thumbImage = imagePath;
        this.dateUpload = date;
    }
}


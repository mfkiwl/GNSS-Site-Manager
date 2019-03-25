/**
* This is the Data & View Models for CORS Network.
*/
export class CorsNetworkModel {
    public id: number;
    public name: string;
    public description: string;
    public effectiveFrom: string;
    public effectiveTo: string;
    public added: boolean;
    public selected: boolean;

    constructor(id: number, name: string, description: string, period: any = null) {
        this.id = id;
        this.name = name;
        this.description = !description ? name : description;
        if (period) {
            this.effectiveFrom = period.from;
            this.effectiveTo = period.to;
        }
        this.added = false;
        this.selected = false;
    }

    clone() {
        let newModel = new CorsNetworkModel(this.id, this.name, this.description);
        newModel.effectiveFrom = this.effectiveFrom;
        newModel.effectiveFrom = this.effectiveFrom;
        return newModel;
    }
}

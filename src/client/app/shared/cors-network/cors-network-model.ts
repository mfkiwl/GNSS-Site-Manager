/**
* This is the Data & View Models for CORS Network.
*/
export class CorsNetworkModel {
    public id: number;
    public name: string;
    public description: string;
    public added: boolean;
    public selected: boolean;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = !description ? 'No description for ' + name : description;
        this.added = false;
        this.selected = false;
    }

    clone() {
        return new CorsNetworkModel(this.id, this.name, this.description);
    }
}

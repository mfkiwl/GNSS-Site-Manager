/**
* This is the Data & View Models for CORS Network.
*/
export class CorsNetworkModel {
    public id: number;
    public name: string;
    public description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

export interface CorsSite {
    id: number;
    fourCharacterId: string;
    name: string;
    siteStatus: string;
    networkTenancies: NetworkTenancy [];
    _links: Link;
}

export interface NetworkTenancy {
    corsNetworkId: number;
    period: EffectivePeriod;
}

export interface EffectivePeriod {
    from: string;
    to: string;
}

export interface Link {
    self: Href;
    corsSite: Href;
    addToNetwork: Href;
    removeFromNetwork: Href;
}

export interface Href {
    href: string;
}

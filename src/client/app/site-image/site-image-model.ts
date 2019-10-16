export class SiteImageModel {

    imageDefinition = new Map<string, string>([
        ['_ant_000', 'North Facing'],
        ['_ant_090', 'East Facing'],
        ['_ant_180', 'South Facing'],
        ['_ant_270', 'West Facing'],
        ['_ant_sn', 'Antenna Serial No'],
        ['_rec_sn', 'Receiver Serial No'],
        ['_ant_monu', 'Antenna Monument'],
        ['_ant_bldg', 'Antenna Building'],
        ['_ant_roof', 'Antenna Roof']
    ]);

    public getCurrentSiteImageNames(): string[] {
        return [
            'ALIC_ant_000_20190108T100000.jpg',
            'ALIC_ant_090_20190108T100000.jpg',
            'ALIC_ant_180_20190108T100000.jpg',
            'ALIC_ant_270_20190108T100000.jpg',
            'ALIC_rec_sn_20190108T100000.jpg',
            'ALIC_ant_sn_20190108T100000.jpg',
            'ALIC_ant_monu_20190108T100000.jpg',
        ];
    }

    public getHistoricSiteImageNames(): string[] {
        return [
            'ALIC_ant_000_20160312T132030.jpg',
            'ALIC_ant_090_20170328T154010.jpg',
            'ALIC_ant_180_20180915T102019.jpg',
            'ALIC_ant_monu_20160426T125610.jpg',
            'ALIC_ant_sn_20170326T141015.jpg',
            'ALIC_rec_sn_20180515T113230.jpg',
            'ALIC_ant_000_20170218T110300.jpg',
            'ALIC_ant_090_20180308T102015.jpg',
            'ALIC_ant_270_20160710T141010.jpg',
            'ALIC_ant_monu_20170516T112420.jpg',
            'ALIC_ant_sn_20180108T130035.jpg',
            'ALIC_ant_000_20180058T110200.jpg',
            'ALIC_ant_180_20160714T133543.jpg',
            'ALIC_ant_270_20170718T121515.jpg',
            'ALIC_ant_monu_20180618T103400.jpg',
            'ALIC_rec_sn_20160630T113000.jpg',
            'ALIC_ant_090_20160525T124516.jpg',
            'ALIC_ant_180_20170623T113022.jpg',
            'ALIC_ant_270_20180528T111515.jpg',
            'ALIC_ant_sn_20160623T151533.jpg',
            'ALIC_rec_sn_20170527T142525.jpg',
        ];
    }
}

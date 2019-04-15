import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  WEB_SERVICE_URL: 'https://gws.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://prodgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://prodgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'https://gnss-site-manager.geodesy.ga.gov.au',
  WEB_URL_LINKS: [
    {name: 'GNSS Data Repository', url: 'https://data.gnss.ga.gov.au'},
    {name: 'GA Regional GNSS Datacentre', url: 'https://www.auscors.ga.gov.au'},
  ],
};

export = ProdConfig;


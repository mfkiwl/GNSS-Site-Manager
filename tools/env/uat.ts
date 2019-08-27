import { EnvConfig } from './env-config.interface';

const UatConfig: EnvConfig = {
  ENV: 'UAT',
  CODELIST_S3_BUCKET_URL: 'https://geodesyml-codelists-test.s3.ap-southeast-2.amazonaws.com',
  WEB_SERVICE_URL: 'https://uat1geodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://uat1geodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  WEB_URL_LINKS: [
    {name: 'AUSCORS', url: 'https://www.auscors.ga.gov.au'},
    {name: 'GNSS Data Repository', url: 'https://uat-data.gnss.ga.gov.au'},
    {name: 'GNSS Portal', url: 'https://portal.gnss.ga.gov.au'},
  ],
};

export = UatConfig;


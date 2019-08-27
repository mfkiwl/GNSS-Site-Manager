import { EnvConfig } from './env-config.interface';

const E2EConfig: EnvConfig = {
  ENV: 'E2E',
  CODELIST_S3_BUCKET_URL: 'https://geodesyml-codelists-dev.s3.ap-southeast-2.amazonaws.com',
  WEB_SERVICE_URL: 'https://devgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://devgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://devgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'http://localhost:5555',
  WEB_URL_LINKS: [
    {name: 'AUSCORS', url: 'https://www.auscors.ga.gov.au'},
    {name: 'GNSS Data Repository', url: 'https://dev-data.gnss.ga.gov.au'},
    {name: 'GNSS Portal', url: 'https://portal.gnss.ga.gov.au'},
  ],
};

export = E2EConfig;


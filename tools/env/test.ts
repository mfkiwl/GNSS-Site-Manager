import { EnvConfig } from './env-config.interface';

const TestConfig: EnvConfig = {
  ENV: 'TEST',
  CODELIST_URL: 'https://geodesyml-codelists-test.s3.ap-southeast-2.amazonaws.com',
  WEB_SERVICE_URL: 'https://testgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://testgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://testgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'https://test.gnss-site-manager.geodesy.ga.gov.au',
  WEB_URL_LINKS: [
    {name: 'AUSCORS', url: 'https://www.auscors.ga.gov.au'},
    {name: 'GNSS Data Repository', url: 'https://test-data.gnss.ga.gov.au'},
    {name: 'GNSS Portal', url: 'https://portal.gnss.ga.gov.au'},
  ],
};

export = TestConfig;


import { EnvConfig } from './env-config.interface';

const LocalConfig: EnvConfig = {
  ENV: 'LOCAL',
  WEB_SERVICE_URL: 'http://localhost:8081',
  WFS_GEOSERVER_URL: 'http://localhost:8082/wfs',
  OPENAM_SERVER_URL: 'http://localhost:8083/openam',
  CLIENT_URL: 'http://localhost:5555',
  WEB_URL_LINKS: [
    {name: 'GNSS Data Repository', url: 'https://dev-data.gnss.ga.gov.au'},
    {name: 'GNSS Data Repo Docs', url: 'https://dev-data.gnss.ga.gov.au/docs'},
    {name: 'GNSS Portal', url: 'https://portal.gnss.ga.gov.au'},
  ],
};

export = LocalConfig;


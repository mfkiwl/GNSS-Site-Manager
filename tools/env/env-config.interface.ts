import { Link } from '../../src/client/app/shared/global/constants.service';

// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API?: string;
  ENV?: string;
  CODELIST_S3_BUCKET_URL?: string;
  WEB_SERVICE_URL?: string;
  WFS_GEOSERVER_URL?: string;
  OPENAM_SERVER_URL?: string;
  CLIENT_URL?: string;
  WEB_URL_LINKS?: Link[];
}

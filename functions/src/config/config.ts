import { config } from 'firebase-functions'

/* config variables are attached attached directly to firebase using the cli
   $firebase functions:config:set ...
   to have additional config passed contact admin who will add it
*/
const c = config() as configVars
// strip additional character escapes (\\n -> \n)
c.service.private_key = c.service.private_key.replace(/\\n/g, '\n')
export const FIREBASE_CONFIG: IFirebaseConfig = JSON.parse(
  process.env.FIREBASE_CONFIG,
)
export const SERVICE_ACCOUNT_CONFIG = c.service
export const ANALYTICS_CONFIG = c.analytics
/************** Interfaces ************** */
interface IServiceAccount {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}
interface IAnalytics {
  tracking_code: string
  view_id: string
}

interface configVars {
  service: IServiceAccount
  analytics: IAnalytics
}
interface IFirebaseConfig {
  databaseURL: string
  storageBucket: string
  projectId: string
}

// if passing complex config variables, may want to
// encode as b64 and unencode here to avoid character escape challenges
function _b64ToString(b64str: string) {
  return Buffer.from(b64str, 'base64').toString('binary')
}

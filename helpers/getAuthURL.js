import { getLiveEnv } from './helpers';

const envToURL = {
  dev: 'https://portaldev.evryhealth.com',
  qa: 'https://portalqa.evryhealth.com',
  demo: 'https://portaldemo.evryhealth.com',
  prod: 'https://portal.evryhealth.com'
};

const getURLWithoutToken = currentUrl => {
  return currentUrl.split('?token=')[0];
};

export const getAuthURL = currentUrl =>
  `${envToURL[getLiveEnv()]}/sign-in?type=providerSearch&redirect=${encodeURI(
    getURLWithoutToken(currentUrl)
  )}`;

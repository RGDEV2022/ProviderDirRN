import { TProviderSearchOut } from '../../../types';

export const formattedAddress = (provider: TProviderSearchOut['data'][0]) => {
  const address1 = provider?.address1;
  const address2 = provider?.address2;
  const city = provider?.city;
  const state = provider?.state;
  const zip = provider?.zip;
  const county = provider?.county ? `${provider?.county} County` : null;

  return `${address1 ? `${address1},` : ''} ${address2 ? `${address2},` : ''} ${
    city ? `${city},` : ''
  } ${state ? `${state},` : ''} ${zip ? `${zip}` : ''} ${county ? `| ${county}` : ''}`
    .replaceAll('null', '')
    .replaceAll('undefined', '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, ' ');
};

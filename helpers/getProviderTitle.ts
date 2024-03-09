import { TProviderSearchOut } from '../../../types';

export const getProviderTitle = (provider: TProviderSearchOut['data'][0]) => {
  const type = provider?.entity_type_code;
  const first = provider?.first_name;
  const last = provider?.last_name;
  const full = provider?.full_name;
  const title = provider?.title;
  const groupName = provider?.group_name;

  type TReturnTitle = {
    fullName: string | null | undefined;
    alias: string | null | undefined;
  };

  let returnTitles: TReturnTitle = { fullName: full, alias: null };

  if (type === '2') return (returnTitles = { fullName: groupName, alias: null });
  else if (type === '1') {
    if (first && last) {
      if (first && last && full)
        if (`${first.toLowerCase()} ${last.toLowerCase()}` === full.toLowerCase()) {
          returnTitles = { fullName: `${first} ${last},  ${title}`, alias: null };
        } else {
          returnTitles = { fullName: `${first} ${last}, ${title}`, alias: full || null };
        }
    } else {
      returnTitles = { fullName: full, alias: null };
    }
  }
  return returnTitles;
};

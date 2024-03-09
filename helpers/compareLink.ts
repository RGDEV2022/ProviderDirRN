import { typeToRoute } from './constants';

type TCompareLink = {
  id: number;
  estPrice: number;
  address: string;
  title: string;
  procedureCode: string;
}[];

export const compareLink = ({
  location,
  profiles
}: {
  location: string;
  profiles: TCompareLink;
}) => {
  let url = '';
  const compareObj = {
    profiles: profiles,
    location: location
  };

  const serializedQuery = JSON.stringify(compareObj);
  if (serializedQuery != undefined) url = `${typeToRoute['compare']}${serializedQuery}/`;

  return url;
};

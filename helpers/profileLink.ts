import { typeToRoute } from './constants';

export const profileLink = (
  type: 'details',
  {
    location,
    id,
    procedureCode,
    planId,
    radius
  }: { location: string; id: number; procedureCode?: string; planId?: number; radius?: number }
) => {
  let url = '';
  const detailsObj = {
    id: id,
    procedureCode: procedureCode ? procedureCode : null,
    location: location,
    planId: planId ? planId : 1,
    radius: radius ? radius : 50
  };

  const objToStringify = type === 'details' ? detailsObj : null;
  const serializedQuery = JSON.stringify(objToStringify);
  if (serializedQuery != undefined) url = `${typeToRoute[type]}${serializedQuery}/`;

  return url;
};

import history from '../../../../utils/history';
import { urlFriendlyString } from './helpers';
import { typeToRoute, defaultFilters, DEFAULT_RECORDS_PER_PAGE } from './constants';

export const setURL = (
  type: 'details' | 'search',
  {
    location,
    address,
    search,
    id,
    map,
    zoom,
    center,
    procedureCode,
    orderBy,
    planId
  }: {
    location: { latitude: number; longitude: number };
    address: string;
    search: string;
    id?: string;
    map: boolean;
    zoom?: string;
    center?: string;
    procedureCode?: string;
    orderBy?: string;
    planId?: number;
  }
) => {
  const queryObj = {
    recordsPerPage: DEFAULT_RECORDS_PER_PAGE,
    search: search ? encodeURIComponent(urlFriendlyString(search)) : null,
    location: {
      latitude: location?.latitude,
      longitude: location?.longitude
    },
    bounds: {
      south_west: {},
      north_east: {}
    },
    specialties: '',
    searchWithinBound: false,
    orderBy: orderBy || 'Distance',
    address: encodeURIComponent(urlFriendlyString(address)),
    map: map ? map : true,
    zoom: zoom ? zoom : 12,
    center: center
      ? center
      : {
          lat: location?.latitude,
          lng: location?.longitude
        },
    procedureCode: procedureCode ? procedureCode : null,
    fromLanding: true,
    planId: planId ? planId : 1,
    ...defaultFilters
  };

  const detailsObj = {
    id: id,
    location: location
  };

  const objToStringify = type === 'details' ? detailsObj : queryObj;
  const serializedQuery = JSON.stringify(objToStringify);
  if (serializedQuery != undefined) {
    const url = `${typeToRoute[type]}${serializedQuery}/`;
    if (type === 'search') window.open(url);
    else history.push(url);
  }

  return { serializedQuery };
};

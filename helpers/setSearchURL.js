import history from '../../../../utils/history';
import { urlFriendlyString } from './helpers';
import { DEFAULT_RECORDS_PER_PAGE, typeToRoute } from './constants';

export const setSearchURL = (
  type,
  {
    page,
    recordsPerPage,
    search,
    location,
    address,
    bounds,
    searchWithinBound,
    specialties,
    orderBy,
    gender,
    acceptingNew,
    entityTypeCode,
    radius,
    map,
    zoom,
    center,
    fromLanding,
    procedureCode,
    hospitalBased,
    planId
  }
) => {
  const queryObj = {
    page: page || 1,
    recordsPerPage: recordsPerPage ? recordsPerPage : DEFAULT_RECORDS_PER_PAGE,
    search: search ? encodeURIComponent(urlFriendlyString(search)) : null,
    location: location,
    address: address ? encodeURIComponent(urlFriendlyString(address)) : null,
    bounds: bounds
      ? bounds
      : {
          south_west: {},
          north_east: {}
        },
    specialties: specialties ? encodeURIComponent(specialties) : '',
    searchWithinBound: searchWithinBound || searchWithinBound === false ? searchWithinBound : false,
    orderBy: orderBy ? orderBy : 'Distance',
    gender: gender ? gender : null,
    acceptingNew: acceptingNew || acceptingNew === false ? acceptingNew : null,
    entityTypeCode: entityTypeCode ? entityTypeCode : null,
    radius: radius ? radius : 50,
    map: map || map === false ? map : true,
    zoom: zoom ? zoom : 12,
    center: center ? center : { lat: location.latitude, lng: location.longitude },
    procedureCode: procedureCode ? procedureCode : null,
    hospitalBased: hospitalBased || hospitalBased === false ? hospitalBased : false,
    planId: planId ? planId : 1,
    fromLanding: fromLanding || fromLanding === false ? fromLanding : false
  };

  const serializedQuery = JSON.stringify(queryObj);
  if (serializedQuery != undefined) history.push(`${typeToRoute[type]}${serializedQuery}/`);

  return { serializedQuery };
};

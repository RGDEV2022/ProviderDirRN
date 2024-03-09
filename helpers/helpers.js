import history from '../../../../utils/history';
import { GOOGLE_API_KEY } from './constants';
import { setURL } from './setURL';
import { setSearchURL } from './setSearchURL';
import { getDirectionsUrl } from './getDirectionsUrl';
import { formattedAddress } from './formattedAddress';
import { profileLink } from './profileLink';
import { compareLink } from './compareLink';
import { getProviderTitle } from './getProviderTitle';
import { getLiveEnv } from './getLiveEnv';
import { getAuthURL } from './getAuthURL';
import { isPreferred } from './isPreferred';

export const handleFoundLocation = (position, setNavStatus, setCurrentLocation) => {
  setCurrentLocation({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });

  setNavStatus({ error: false, isLoading: false, useNavigationLocation: true });
};

export const getCurrentLocation = (setNavStatus, setCurrentLocation) => {
  setNavStatus({ error: false, isLoading: true });
  window.navigator.geolocation.getCurrentPosition(
    position => handleFoundLocation(position, setNavStatus, setCurrentLocation),
    error => setNavStatus({ error: true, isLoading: false })
  );
};

export const getZoomLevel = (currentZoom, checkZoom) => {
  const zoomOffset = 1.000000001;
  if (!checkZoom) return currentZoom * zoomOffset;
  return currentZoom == checkZoom ? checkZoom * zoomOffset : checkZoom;
};

export const getLocation = (setNavStatus, setCurrentLocation) => {
  if (window.navigator.geolocation) {
    getCurrentLocation(setNavStatus, setCurrentLocation);
  }
};

export const generateStaticMapLink = address => {
  const sanitizedAddress = address && address.replace(/ /g, '+').replaceAll('#', '%23');

  return `http://maps.googleapis.com/maps/api/staticmap?center=${sanitizedAddress}&zoom=14&size=343x200&markers=color:red|${sanitizedAddress}&key=${GOOGLE_API_KEY}`;
};

export const formattedTitle = s =>
  s
    .replaceAll('null', '')
    .replaceAll(/\s+/g, ' ')
    .trim();

export const standardFormattedString = string =>
  string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();

export const urlFriendlyString = string => string.replace(/[%\\"]/g, '');

export const backAway = () => {
  const hasReferrer = document.referrer;
  let canGoBack = window.history.length > 1;
  if (canGoBack && hasReferrer) history.goBack();
  if (!hasReferrer) history.push('/');
  return canGoBack;
};

export {
  setURL,
  setSearchURL,
  getDirectionsUrl,
  formattedAddress,
  profileLink,
  compareLink,
  getProviderTitle,
  getLiveEnv,
  getAuthURL,
  isPreferred
};

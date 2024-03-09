import axios from 'axios';
import { GOOGLE_API_KEY } from './constants';
import { TGMapsGetAddress } from '../../../types';

export const calculateBoundsCenter = ({
  swLatitude,
  swLongitude,
  neLatitude,
  neLongitude
}: {
  swLatitude: number;
  swLongitude: number;
  neLatitude: number;
  neLongitude: number;
}) => {
  const centerLatitude = (swLatitude + neLatitude) / 2;
  const centerLongitude = (swLongitude + neLongitude) / 2;

  return {
    lat: centerLatitude,
    lng: centerLongitude
  };
};

export const getAddressFromBounds = async ({
  swLatitude,
  swLongitude,
  neLatitude,
  neLongitude
}: {
  swLatitude: number;
  swLongitude: number;
  neLatitude: number;
  neLongitude: number;
}) => {
  const center = calculateBoundsCenter({ swLatitude, swLongitude, neLatitude, neLongitude });
  const address = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.lat},${center.lng}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      return (response.data as TGMapsGetAddress).results[0].formatted_address;
    })
    .catch(error => {
      console.log(error);
    });

  return { address, center };
};

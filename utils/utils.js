const METERS_PER_MILE = 1609.34;

export function convertMetersToMiles(meters) {
  const miles = meters / METERS_PER_MILE;
  return miles.toFixed(2);
}

export function convertMilesToMeters(miles) {
  const meters = miles * METERS_PER_MILE;
  return meters.toFixed(2);
}

/**
 * Helper function to build out a link for a google place.
 * @param {string} placeId The id of a google place to generate a google link for.
 * @param {string} placeName The name of the google place to generate a google link for.
 * @returns {string || undefined} A url that links the the place on google.
 */
export function generateGoogleLink(placeId, placeName) {
  let googleLink;

  if (placeId) {
    googleLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      placeName
    )}&query_place_id=${encodeURIComponent(placeId)}`;
  }

  return googleLink;
}

/**
 * Helper function to build out the address of a place from its address_components
 */
export function buildPlaceAddress(place) {
  let address1 = '';
  let city = '';
  let state = '';
  let postcode = '';

  if (!place.address_components) return;

  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case 'street_number':
        address1 = `${component.long_name} ${address1}`;
        break;
      case 'route':
        address1 += component.short_name;
        break;
      case 'postal_code':
        postcode = `${component.long_name}${postcode}`;
        break;
      case 'postal_code_suffix':
        postcode = `${postcode}-${component.long_name}`;
        break;
      case 'locality':
        city = component.long_name;
        break;
      case 'administrative_area_level_1':
        state = component.short_name;
    }
  }

  const address = `${address1}, ${city}, ${state} ${postcode}`;

  return address;
}

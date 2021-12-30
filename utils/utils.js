const METERS_PER_MILE = 1609.34;

export function convertMetersToMiles(meters) {
  const miles = meters / METERS_PER_MILE;
  return miles.toFixed(2);
}

export function convertMilesToMeters(miles) {
  const meters = miles * METERS_PER_MILE;
  return meters.toFixed(2);
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Checks if a given point is inside a specified area defined by its top left and bottom right coordinates.
 * @param topLeft - The coordinates of the top left corner of the area.
 * @param bottomRight - The coordinates of the bottom right corner of the area.
 * @param point - The coordinates of the point to check. If not provided, defaults to undefined.
 * @returns A boolean indicating whether the point is inside the specified area.
 */
export const isPointInsideArea = (
  topLeft: Coordinates,
  bottomRight: Coordinates,
  point?: Coordinates,
): boolean => {
  if (!point?.latitude || !point?.longitude) return false;
  return (
    point.latitude >= bottomRight.latitude &&
    point.latitude <= topLeft.latitude &&
    point.longitude >= topLeft.longitude &&
    point.longitude <= bottomRight.longitude
  );
};

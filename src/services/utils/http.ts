export function isHttpError(statusCode: number): boolean {
  const firstDigital = parseInt(String(statusCode / 100), 10);
  return firstDigital === 4 || firstDigital === 5;
}

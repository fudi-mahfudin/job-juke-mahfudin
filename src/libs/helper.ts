export function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function cleanUrl(string: string) {
  return string.replace(/[\[\]"]/g, "");
}

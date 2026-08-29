/**
 * Shared by the browser form and the Server Action so the accepted formats do
 * not drift apart. HTML's `pattern` attribute uses the regex source, while the
 * server runs the same expression again because client validation is bypassable.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

/**
 * Accepts Turkish mobile numbers written as +90 5xx, 0090 5xx, 05xx or 5xx.
 * Spaces, dots, dashes and parentheses are allowed only as visual separators.
 */
export const PHONE_REGEX = /^(?:(?:\+|00)90[\s().-]*|0[\s().-]*)?5\d{2}(?:[\s().-]*\d){7}$/;

export function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value);
}

export function isValidTurkishMobile(value: string) {
  return PHONE_REGEX.test(value);
}

export const required = value => (value || typeof value === 'number' ? undefined : 'Required');
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+(?:com|org|net|in|edu|info|net|co.in)/i.test(value)
    ? 'Invalid email address' : undefined;
export const tooYoung = value => value && value < 13
    ? 'You do not meet the minimum age requirement!' : undefined;
export const aol = value => value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?' : undefined;
export const alphaNumeric = value => value && /[^a-zA-Z0-9_ ]/i.test(value)
    ? 'Only alphanumeric characters' : undefined;
export const alpha = value => value && /[^a-zA-Z_ ]/i.test(value)
    ? 'Only alphabetic characters' : undefined;
// export const phoneNumber = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//     ? 'Invalid phone number, must be 10 digits' : undefined;
export const phoneNumber = value => value && !/^(0|[6-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits' : undefined;

export const pinCode = value => value && !/^(0|[1-9][0-9]{5})$/i.test(value)
    ? 'Invalid pin number, must be 6 digits' : undefined;
export const landLineNumber = value => value && !/^(0|[1-9][0-9]{10})$/i.test(value)
    ? 'Invalid landline number, must be 11 digits' : undefined;
import Joi from 'joi';

const isValidEmail = (email) => {
  let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  return re.test(email);
};

const ADDRESS = /^[a-zA-Z0-9\s,.'-]*$/;
const LATLONGS = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

const checkPhoneNumber = (phone) => {
  let check = /^(03)\d{9}$/;
  return check.test(phone);
};

const passwordCheck = (value) => {
  let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return re.test(value);
};

const isValidNumber = (value) => {
  let re = /^([0-9]\d*)$/;
  return re.test(value);
};

const isValidPhoneNumber = (data) => {
  const schema = Joi.object().keys({
    phone: Joi.string()
      .regex(/^(03)\d{9}$/, 'numbers')
      .max(11)
      .min(11)
      .required(),
  });

  return Joi.validate(data, schema, { abortEarly: false, allowUnknown: true });
};
const APLHANUMERIC = /^[a-zA-Z0-9]+$/;

const vulnerability = (tripId) => {
  if (tripId) {
    let errors = {};
    tripId = tripId.trim();
    if (
      tripId.includes('<scrip') ||
      tripId.includes('func') ||
      tripId.includes('(') ||
      tripId.includes('{') ||
      tripId.includes('<') ||
      tripId.includes('(func') ||
      tripId.includes('<Scrip')
    ) {
      if (true) {
        errors.crossSite = 'Please Enter Valid Trip No';
        return errors;
      } else {
        return;
      }
    } else {
      return;
    }
  }
};

const TripNo = (value) => {
  let re = /^[a-zA-Z0-9]+$/;
  return re.test(value);
};

const checkNameStringWIthSpaces = (value) => {
  let re = /^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$/;
  return re.test(value);
};

const checkPakistanNumber = (value) => {
  let re = /^(92)\d{10}$/;
  return re.test(value);
};

const isValidAlpabetWord = (value) => {
  let re = /^[A-Za-z\s]+$/;
  return re.test(value);
};

const isValidAlphanumeric = (value) => {
  let re = /^[A-Za-z\d\s]+$/;
  return re.test(value);
};

const isValueExist = (value) => {
  return Boolean(value);
};

const isMatch = (value1, value2) => {
  return value1 === value2;
};

const isLatLngExist = (coordinates) => {
  return coordinates.length !== 0;
};

const isValid = (errors, data) => {
  for (let key in errors) {
    if (errors[key] || data[key] === '') {
      return false;
    }
  }
  return true;
};

const isBetweenRange = (value, range) => {
  return value.length > range.min && value.length < range.max;
};

const isBetweenOREqualToRange = (value, range) => {
  return value.length >= range.min && value.length <= range.max;
};

const isGreaterThan = (value, min) => {
  return value.length > min;
};

const isGreaterThanOrEqualTo = (value, min) => {
  return value.length >= min;
};

const isLowerThan = (value, max) => {
  return value.length < max;
};

const isLowerThanOrEqualTo = (value, max) => {
  return value.length < max;
};

export {
  isValidEmail,
  isValidNumber,
  isValidPhoneNumber,
  isValidAlpabetWord,
  isValid,
  isValidAlphanumeric,
  isValueExist,
  isMatch,
  isLatLngExist,
  isBetweenRange,
  isGreaterThan,
  passwordCheck,
  LATLONGS,
  isGreaterThanOrEqualTo,
  isLowerThan,
  isLowerThanOrEqualTo,
  isBetweenOREqualToRange,
  checkPhoneNumber,
  ADDRESS,
  APLHANUMERIC,
  checkNameStringWIthSpaces,
  checkPakistanNumber,
  TripNo,
  vulnerability,
};

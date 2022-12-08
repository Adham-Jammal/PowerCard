export const requiredValidation = {
  required: true,
  message: "please_fill_this_field",
};

// email validation
export const emailValidation = [
  requiredValidation,
  {
    type: "email",
    message: "please_enter_valid_email",
  },
];
// login password validation
export const loginPasswordValidation = [requiredValidation];

// register full name validation
export const fullNameValidation = [
  requiredValidation,
  {
    pattern: "^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$",
    message: "please_enter_valid_full_name",
  },
];
// register password validation
export const passwordValidation = [
  requiredValidation,
  {
    min: 8,
    message: "the_password_must_contain_at_least_8_characters",
  },
  {
    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    message: "the_password_must_contain_at_least_number_and_symbol",
  },
];

// register confirm password validation
export const confirmPasswordValidation = [requiredValidation];

// company name validation
export const companyNameValidation = [
  requiredValidation,
  {
    pattern: "^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$",
    message: "please_enter_valid_company_name",
  },
];
// company name validation
export const regionValidation = [
  requiredValidation,
  {
    pattern: "/^[A-Za-z]+$/",
    message: "please_enter_valid_region_name",
  },
];

// phone number  validation
export const phoneNumberValidation = [
  requiredValidation,
  {
    pattern: "^[0-9]+$",
    message: "please_input_numeric_characters_only",
  },
];

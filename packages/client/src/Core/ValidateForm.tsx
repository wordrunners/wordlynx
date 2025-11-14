/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */

type FormProps = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
}

export default function ValidateForm(values: any) {
  const { login, password, first_name, second_name, email, phone } = values;

  const errors: Partial<FormProps> = {};
  if (login) {
    if (!/(?!^\d+$)[a-zA-Z0-9\-_]{3,20}/.test(login)) {
      errors.login = "The login must contain Latin letters and numbers; hyphens and underscores are allowed. It must be between 3 and 20 characters long."
    }
  }

  if (password) {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,40}$/.test(password)) {
      errors.password = "The password must contain at least one uppercase letter and one number. It must be between 8 and 40 characters long."
    }
  }

  if (first_name) {
    if (!/^[A-ZА-Я][a-zA-Zа-яА-Я\-]*$/.test(first_name)) {
      errors.first_name = "The first letter must be uppercase. Numbers and special characters, except for hyphens, are not allowed."
    }
  }

  if (second_name) {
    if (!/^[A-ZА-Я][a-zA-Zа-яА-Я\-]*$/.test(second_name)) {
      errors.second_name = "The first letter must be uppercase. Numbers and special characters, except for hyphens, are not allowed."
    }
  }
  if (email) {
    if (!/^[\w\-]+@[\w\-]+\.[\w\-]+$/.test(email)) {
      errors.email = "Email must be in the format name@domain.com"
    }
  }

  if (phone) {
    if (!/^[+\d]\d{9,14}$/.test(phone)) {
      errors.phone = "The phone number must contain 10 to 15 digits and may start with a plus sign."
    }
  }

  return errors;
}



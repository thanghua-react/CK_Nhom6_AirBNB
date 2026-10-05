// Lazily read test data from environment variables so that listing tests works without a .env file.
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const env = {
  get loginEmail() { return required("LOGIN_EMAIL"); },
  get loginPassword() { return required("LOGIN_PASSWORD"); },
  get loginInvalidEmail() { return required("LOGIN_INVALID_EMAIL"); },
  get loginInvalidPassword() { return required("LOGIN_INVALID_PASSWORD"); },
  get registerName() { return required("REGISTER_NAME"); },
  get registerExistingEmail() { return required("REGISTER_EXISTING_EMAIL"); },
  get registerPassword() { return required("REGISTER_PASSWORD"); },
  get registerPhone() { return required("REGISTER_PHONE"); },
  get registerBirthday() { return required("REGISTER_BIRTHDAY"); },
  get registerGender() { return required("REGISTER_GENDER"); },
};

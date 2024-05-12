import axios from "axios";

export async function createUser(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  birthDate,
  bio,
  interests,
  gender,
) {
  const { data } = await axios.post(
    "https://api.connector-app.net/auth/sign-up",
    {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: confirmPassword,
      birth_date: birthDate,
      bio,
      interests,
      gender,
    },
  );
  return { data };
}

export async function login(email, password) {
  const { data } = await axios.post(
    "https://api.connector-app.net/auth/sign-in",
    {
      email,
      password,
    },
  );
  return { data };
}

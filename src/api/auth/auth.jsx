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
  const { data } = await axios.post("http://18.153.84.68/auth/sign-up", {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    confirm_password: confirmPassword,
    birth_date: birthDate,
    bio,
    interests,
    gender,
  });
  return { data };
}

export async function login(email, password) {
  const { data } = await axios.post("http://18.153.84.68/auth/sign-in", {
    email,
    password,
  });
  return { data };
}

export async function updateUser(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  age,
  bio,
  interests,
) {
  const { data } = await axios.put("http://18.153.84.68/users", {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    confirm_password: confirmPassword,
    age,
    bio,
    interests,
  });
  return data;
}

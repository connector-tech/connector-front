import axios from "axios";

export async function createUser(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  age,
  bio,
  interests,
) {
  const { data } = await axios.post(
    "https://core-46ur.onrender.com/auth/sign-up",
    {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: confirmPassword,
      age,
      bio,
      interests,
    },
  );
  return { data };
}

export async function login(email, password) {
  const { data } = await axios.post(
    "https://core-46ur.onrender.com/auth/sign-in",
    {
      email,
      password,
    },
  );
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
  const { data } = await axios.post("https://core-46ur.onrender.com/", {
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

import axios from "axios";

export async function getUsers(size) {
  const { data } = await axios.get("https://core-46ur.onrender.com/users", {
    headers: {
      token: sessionStorage.getItem("token"),
    },
  });
  return { data };
}

export async function getMatchedUsers() {
  const { data } = await axios.get(
    "https://core-46ur.onrender.com/social/matches",
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    },
  );
  return { data };
}

export async function getMyUserInfo() {
  const { data } = await axios.get("https://core-46ur.onrender.com/users/me", {
    headers: {
      token: sessionStorage.getItem("token"),
    },
  });
  return data;
}

export async function uploadPhotos(photos) {
  const { data } = await axios.post(
    "https://core-46ur.onrender.com/users/photos/upload",
    {
      photos,
    },
    {
      headers: {
        token: sessionStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return { data };
}

export async function updateUser(
  firstName,
  lastName,
  birthDate,
  bio,
  interests,
) {
  const { data } = await axios.put(
    "https://core-46ur.onrender.com/users/",
    {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      bio,
      interests,
    },
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    },
  );
  return data;
}

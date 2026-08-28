const BASE_URL = "https://api.around.mooo.com";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      console.error("Error response body:", text);
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      console.error("Error response body:", text);
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      console.error("Error response body:", text);
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
};

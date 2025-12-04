import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function register(name, email, password, password_confirmation) {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation, 
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return {
      success: true,
      token: res.data.token,
      user: res.data.user,
    };

  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Erreur d'inscription",
    };
  }
}


export async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return {
      success: true,
      token: res.data.token,
      user: res.data.user,
    };

  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Email ou mot de passe incorrect",
    };
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

export function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
import axios from "axios";

const API_URL = "http://localhost:5001";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  console.log(username, password);
  await axios
    .post(`http://localhost:5001/login`, {
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

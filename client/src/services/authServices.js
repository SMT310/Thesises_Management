import axios from "axios";

// const apiUrl = process.env.REACT_APP_API_URL + "/auths";

const authService = {
  signIn: async (data) => {
    try {
      // const respone = await axios.post(apiUrl + "/signin", {
      const respone = await axios.post("http://localhost:8000/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      console.log("hihi");
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },

  logout: (data) => {
    try {
      const respone = axios.post("http://localhost:8000/api/auth/logout", data);
      console.log(respone.datap);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authService;

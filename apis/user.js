import { defaultInstance } from "./index";

const login = (email, password) => {
  return defaultInstance.post("/user/login", {
    email,
    password,
  });
};

const loginByFb = ({ access_token }) => {
  return defaultInstance.post("/user/loginByFb", {
    access_token
  });
};

const loginByGoogle = ({ access_token }) => {
  return defaultInstance.post("/user/loginByGoogle", {
    access_token
  });
};

const sendOTP = (phoneNumber) => {
  return defaultInstance.post("/user/sendOTP", {
    phoneNumber
  });
}

const verifyOTP = ({token,secret}) => {
  return defaultInstance.post("/user/verifyOTP", {
    token,
    secret
  });
}

const registerByFb = (data) => {
  return defaultInstance.post("/user/registerByFb", {
    data
  });
}

const registerByGog = (data) => {
  return defaultInstance.post("/user/registerByGog", {
    data
  });
}

const register = (data) => {
  return defaultInstance.post("/user", {
    data
  })
}

const getProfile = () => {
  return defaultInstance.get('/user/investor/me')
}

export const userApi = {
    login,
    loginByFb,
    sendOTP,
    verifyOTP,
    registerByFb,
    register,
    loginByGoogle,
    registerByGog,
    getProfile
};
  
import { defaultInstance } from "./index";

const login = (email, password,type) => {
  return defaultInstance.post("/user/login", {
    email,
    password,
    type
  });
};

const loginByFb = ({ access_token, type }) => {
  return defaultInstance.post("/user/loginByFb", {
    access_token,
    type
  });
};

const loginByGoogle = ({ access_token, type }) => {
  return defaultInstance.post("/user/loginByGoogle", {
    access_token,
    type
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
  return defaultInstance.post("/user",data)
}

const getProfile = () => {
  return defaultInstance.get('/user/investor/me')
}

const getAllAdmin = () => {
  return defaultInstance.get('/user/admin/all')
}

const update = (data) => {
  return defaultInstance.put('/user', data)
}

const changePassword = (data) => {
  return defaultInstance.put("/user/change-password", data)
}

const resetPassword = (data) => {
  return defaultInstance.put("/user/reset-password", data)
}

const forgotPassword = (email) => {
  return defaultInstance.post("/user/forgot-password", {
    email
  })
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
    getProfile,
    update,
    changePassword,
    forgotPassword,
    resetPassword,
    getAllAdmin
};
  
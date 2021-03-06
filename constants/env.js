import Constants from "expo-constants";

let localhost;
if (Constants.manifest.debuggerHost) {
  localhost = Constants.manifest.debuggerHost.split(":").shift();
}

const ENV = {
  dev: {
    API_URI: `http://${localhost}:3000/api`,
  },
  prod: {
    API_URI: `https://studentloanfpt.ddns.net/api`
    // API_URI: "http://192.168.1.19:3000/api"
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars;

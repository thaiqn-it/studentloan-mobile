import axios from "axios";
import getEnvVars from "../constants/env";
import { getJWTToken } from "../constants";

const { API_URI } = getEnvVars();

const defaultInstance = axios.create({
  baseURL: API_URI,
});

export const loadToken = async () => {
  await getJWTToken().then(token => {
    defaultInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  })
}

export { defaultInstance };

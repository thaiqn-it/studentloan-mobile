import { defaultInstance } from "./index";

const getByType = (type) => {
    return defaultInstance.get("/config/"+type)
}


export const configApi = {
    getByType
};
  
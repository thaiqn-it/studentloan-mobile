import { defaultInstance } from "./index";

const getAll = () => {
    return defaultInstance.get("/major");
}

export const majorApi = {
    getAll
};
  
import { defaultInstance } from "./index";

const getAll = () => {
    return defaultInstance.get("/school");
}

export const schoolApi = {
    getAll
};
  
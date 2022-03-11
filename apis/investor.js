import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/investor", {
        data
    });
}

export const investorApi = {
    create,
};
  
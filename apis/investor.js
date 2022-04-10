import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/investor", {
        data
    });
}

const update = (data) => {
    return defaultInstance.put("/investor",data);
}

export const investorApi = {
    create,
    update
};
  
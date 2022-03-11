import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/transaction", {
        data
    })
}

const getById = (id) => {
    return defaultInstance.get("/transaction" + id)
}

export const transactionApi = {
    create,
    getById
};
  
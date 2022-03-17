import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/transaction",data)
}

const getById = (id) => {
    return defaultInstance.get("/transaction/" + id)
}

const getByAccountId = (id) => {
    return defaultInstance.get("/transaction/account/" + id)
}

export const transactionApi = {
    create,
    getById,
    getByAccountId
};
  
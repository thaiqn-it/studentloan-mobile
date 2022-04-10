import { defaultInstance } from "./index";

const findAllByInvestorId = () => {
    return defaultInstance.get("/investment");
}

const create = (data) => {
    return defaultInstance.post("/investment", data)
}

const checkExist = (id) => {
    return defaultInstance.get("/investment/loan/"+ id)
}

const getOneById = (id) => {
    return defaultInstance.get("/investment/"+ id)
}

export const investmentApi = {
    findAllByInvestorId,
    create,
    checkExist,
    getOneById
};
  
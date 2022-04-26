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

const updateById = (id,data) => {
    return defaultInstance.put("/investment/"+ id,data)
}

const count = () => {
    return defaultInstance.get("/investment/count")
}

const checkValidMoney = (id,money) => {
    return defaultInstance.get(`/investment/loan/${id}/check-money`, {
        params : {
            loanId : id,
            money
        }
    })
}

export const investmentApi = {
    findAllByInvestorId,
    create,
    checkExist,
    getOneById,
    updateById,
    count,
    checkValidMoney
};
  
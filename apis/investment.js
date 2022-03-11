import { defaultInstance } from "./index";

const findAllByInvestorId = (id) => {
    return defaultInstance.get("/investment/" + id);
}

const create = (data) => {
    return defaultInstance.post("/investment", data)
}

export const investmentApi = {
    findAllByInvestorId,
    create
};
  
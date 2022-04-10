import { defaultInstance } from "./index";

const getByInvestorId = () => {
    return defaultInstance.get("/contract/investor")
}

export const contractApi = {
    getByInvestorId
};
  
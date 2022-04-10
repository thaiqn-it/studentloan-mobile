import { defaultInstance } from "./index";

const getTransactionFee = (type) => {
    return defaultInstance.get("/config/transaction-fee")
}


export const configApi = {
    getTransactionFee
};
  
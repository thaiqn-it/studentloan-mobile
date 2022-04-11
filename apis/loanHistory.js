import { defaultInstance } from "./index";

const findOneByLoanId = (id) => {
    return defaultInstance.get("/loanhistory/loan/"+ id);
}
export const loanHistoryApi = {
    findOneByLoanId
};
  
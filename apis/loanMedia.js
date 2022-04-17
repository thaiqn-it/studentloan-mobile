import { defaultInstance } from "./index";

const getAllEvidenceByLoanId = (loanId) => {
    return defaultInstance.get("/loanmedia/loan/"+ loanId +"/evidence");
}

export const loanMediaApi = {
    getAllEvidenceByLoanId
};
  
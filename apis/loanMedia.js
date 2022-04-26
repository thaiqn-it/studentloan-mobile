import { defaultInstance } from "./index";

const getAllEvidenceByLoanId = (loanId) => {
    return defaultInstance.get("/loanmedia/loan/"+ loanId +"/evidence");
}

const getAllTranscriptByLoanId = (loanId) => {
    return defaultInstance.get("/loanmedia/loan/"+ loanId +"/transcript");
}

export const loanMediaApi = {
    getAllEvidenceByLoanId,
    getAllTranscriptByLoanId
};
  
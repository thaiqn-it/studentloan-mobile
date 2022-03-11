import { defaultInstance } from "./index";

const getAll = (data) => {
    return defaultInstance.get("/loan", {
        params : {
            ...data
        } 
    });
};

const getById = (id) => {
    return defaultInstance.get(`/loan/${id}`);
};

export const loanApi = {
    getAll,
    getById
};
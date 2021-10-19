import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/student", {
        data
    });
}

export const studentApi = {
    create,
};
  
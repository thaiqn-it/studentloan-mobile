import { defaultInstance } from "./index";

const getByUserId = (id) => {
    return defaultInstance.get("/account/" + id)
}

const update = (money,id) => {
    return defaultInstance.put("/account/" + id, {
        money
    })
}

export const accountApi = {
    update,
    getByUserId
};
  